"use client";

import { useEffect, useState } from "react";

const endings = ["reliable.", "dependable.", "ready to ship."];

export default function HeroHeadline() {
  const [endingIndex, setEndingIndex] = useState(0);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) return;

    const interval = window.setInterval(() => {
      setEndingIndex((current) => (current + 1) % endings.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <h1>
      Making software feel <span key={endingIndex} className="hero-headline-word">{endings[endingIndex]}</span>
    </h1>
  );
}
