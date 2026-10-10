"use client";

import type { CSSProperties } from "react";

type Skill = { name: string; logo?: string; image?: string };

const skills: Skill[] = [
  { name: "Java", logo: "java/java-original.svg" },
  { name: "C++", logo: "cplusplus/cplusplus-original.svg" },
  { name: "HTML", logo: "html5/html5-original.svg" },
  { name: "CSS", logo: "css3/css3-original.svg" },
  { name: "JavaScript", logo: "javascript/javascript-original.svg" },
  { name: "GitHub", logo: "github/github-original.svg" },
  { name: "Postman", logo: "postman/postman-original.svg" },
  { name: "SEO", image: "/skill-icons/seo.svg" },
  { name: "SMO", image: "/skill-icons/smo.svg" },
  { name: "Content Writing", image: "/skill-icons/content-writing.svg" },
  { name: "MySQL", logo: "mysql/mysql-original.svg" },
  { name: "JDBC", logo: "java/java-original.svg" },
  { name: "Hibernate", logo: "hibernate/hibernate-original.svg" },
  { name: "JSP", image: "/skill-icons/jsp.svg" },
  { name: "Jira", logo: "jira/jira-original.svg" },
  { name: "Manual Testing", image: "/skill-icons/manual-testing.svg" },
  { name: "LLM Testing", image: "/skill-icons/llm-testing.svg" },
  { name: "Agile & Scrum", image: "/skill-icons/agile-scrum.svg" },
];

export default function SkillGrid() {
  return (
    <div className="skill-gallery">
      <div className="skills-grid" aria-label="All portfolio skills">
        {skills.map((skill, index) => (
          <article className="skill-card" key={skill.name}>
            <span className="skill-icon" aria-hidden="true" style={{ "--tile-delay": `${index * 25}ms` } as CSSProperties}>
              {skill.logo || skill.image ? (
                <>
                  <img
                    className={skill.image ? "skill-art" : undefined}
                    src={skill.image ?? `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/${skill.logo}`}
                    alt=""
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.hidden = true;
                      event.currentTarget.nextElementSibling?.removeAttribute("hidden");
                    }}
                  />
                  <svg className="skill-icon-fallback" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" hidden>
                    <path d="M5 5h14v14H5zM9 9l6 6m0-6-6 6" />
                  </svg>
                </>
              ) : null}
            </span>
            <h3>{skill.name}</h3>
          </article>
        ))}
      </div>
    </div>
  );
}
