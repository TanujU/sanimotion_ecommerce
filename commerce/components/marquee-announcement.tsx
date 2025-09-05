"use client";

import { useMemo } from "react";

interface MarqueeAnnouncementProps {
  text: string;
  className?: string;
}

export function MarqueeAnnouncement({
  text,
  className = "",
}: MarqueeAnnouncementProps) {
  // Create a consistent array of spans to avoid hydration mismatches
  const marqueeSpans = useMemo(() => {
    const spans = [];
    // First span without aria-hidden
    spans.push(<span key="original">{text}</span>);
    // 15 duplicate spans with aria-hidden
    for (let i = 0; i < 15; i++) {
      spans.push(
        <span key={`duplicate-${i}`} aria-hidden="true">
          {text}
        </span>
      );
    }
    return spans;
  }, [text]);

  return (
    <div className={`marquee-text ${className}`}>
      <p className="marquee-caps marquee__inner">
        {marqueeSpans}
      </p>
    </div>
  );
}
