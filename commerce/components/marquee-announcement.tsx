"use client";

interface MarqueeAnnouncementProps {
  text: string;
  className?: string;
}

export function MarqueeAnnouncement({
  text,
  className = "",
}: MarqueeAnnouncementProps) {
  return (
    <div className={`marquee-text ${className}`}>
      <p className="marquee-caps marquee__inner">
        <span>{text}</span>
        <span aria-hidden="true">{text}</span>
        <span aria-hidden="true">{text}</span>
        <span aria-hidden="true">{text}</span>
        <span aria-hidden="true">{text}</span>
        <span aria-hidden="true">{text}</span>
        <span aria-hidden="true">{text}</span>
        <span aria-hidden="true">{text}</span>
        <span aria-hidden="true">{text}</span>
        <span aria-hidden="true">{text}</span>
        <span aria-hidden="true">{text}</span>
        <span aria-hidden="true">{text}</span>
        <span aria-hidden="true">{text}</span>
        <span aria-hidden="true">{text}</span>
        <span aria-hidden="true">{text}</span>
        <span aria-hidden="true">{text}</span>
      </p>
    </div>
  );
}
