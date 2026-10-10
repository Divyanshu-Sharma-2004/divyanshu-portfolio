"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  url: string;
  linkText?: string;
};

const filters = ["All", "Java", "Web", "Python", "Games", "QA"] as const;
type Filter = (typeof filters)[number];

function projectType(project: Project): Exclude<Filter, "All"> {
  if (project.category.includes("quality assurance")) return "QA";
  if (project.category.includes("browser game") || project.category.endsWith("game")) return "Games";
  if (project.category.includes("Java")) return "Java";
  if (project.category.includes("Python")) return "Python";
  return "Web";
}

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [firstVisible, setFirstVisible] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const visibleProjects = activeFilter === "All" ? projects : projects.filter((project) => projectType(project) === activeFilter);

  useEffect(() => {
    function measureVisibleCards() {
      const element = track.current;
      const card = element?.querySelector<HTMLElement>(".project-card");
      if (!element || !card) return setVisibleCount(3);
      const gap = parseFloat(getComputedStyle(element).columnGap) || 14;
      setVisibleCount(Math.max(1, Math.round(element.clientWidth / (card.getBoundingClientRect().width + gap))));
    }
    measureVisibleCards();
    window.addEventListener("resize", measureVisibleCards);
    return () => window.removeEventListener("resize", measureVisibleCards);
  }, [visibleProjects.length]);

  function move(direction: -1 | 1) {
    const element = track.current;
    if (!element) return;
    element.scrollBy({ left: direction * element.clientWidth, behavior: "smooth" });
  }

  function updatePosition() {
    const element = track.current;
    const card = element?.querySelector<HTMLElement>(".project-card");
    if (!element || !card) return setFirstVisible(0);
    const gap = parseFloat(getComputedStyle(element).columnGap) || 14;
    setFirstVisible(Math.floor((element.scrollLeft + 2) / (card.getBoundingClientRect().width + gap)));
  }

  function selectFilter(filter: Filter) {
    setActiveFilter(filter);
    setFirstVisible(0);
    if (track.current) track.current.scrollTo({ left: 0, behavior: "smooth" });
  }

  const rangeEnd = Math.min(firstVisible + visibleCount, visibleProjects.length);

  return (
    <div className="project-carousel">
      <div className="project-tools">
        <div className="project-filters" role="group" aria-label="Filter projects by type">
          {filters.map((filter) => {
            const count = filter === "All" ? projects.length : projects.filter((project) => projectType(project) === filter).length;
            return <button className={activeFilter === filter ? "project-filter is-active" : "project-filter"} type="button" key={filter} aria-pressed={activeFilter === filter} onClick={() => selectFilter(filter)}>
              <span>{filter}</span><small>{String(count).padStart(2, "0")}</small>
            </button>;
          })}
        </div>
        <div className="project-carousel-controls">
          <span className="project-count" aria-live="polite">{String(Math.min(firstVisible + 1, visibleProjects.length)).padStart(2, "0")}-{String(rangeEnd).padStart(2, "0")} <i>/</i> {String(visibleProjects.length).padStart(2, "0")}</span>
          <button type="button" aria-label="Previous projects" onClick={() => move(-1)} disabled={firstVisible === 0}>{"\u2190"}</button>
          <button type="button" aria-label="Next projects" onClick={() => move(1)} disabled={rangeEnd >= visibleProjects.length}>{"\u2192"}</button>
        </div>
      </div>
      <div className="project-grid" ref={track} onScroll={updatePosition} onKeyDown={(event) => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); } }} aria-label="Portfolio projects" tabIndex={0}>
        {visibleProjects.map((project, index) => <article className="project-card" key={project.title} style={{ "--project-index": index } as CSSProperties}>
          <div className="project-top"><span>{project.category}</span><span>{project.url.startsWith("https://github.com/") ? "GitHub" : "QA work"}</span></div>
          <h3>{project.title}</h3><p>{project.description}</p>
          <div className="tags">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
          <a className="project-link" href={project.url} target={project.url.startsWith("https://") ? "_blank" : undefined} rel={project.url.startsWith("https://") ? "noopener noreferrer" : undefined}>{project.linkText ?? "View repository ↗"}</a>
        </article>)}
      </div>
      <div className="project-progress" aria-hidden="true"><span style={{ width: `${visibleProjects.length ? (rangeEnd / visibleProjects.length) * 100 : 0}%` }} /></div>
    </div>
  );
}
