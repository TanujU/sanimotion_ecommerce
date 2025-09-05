"use client";

import { useEffect } from "react";

export function ScrollAnimations() {
  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }
      });
    }, observerOptions);

    // Observe all elements with scroll reveal classes
    const scrollElements = document.querySelectorAll(
      ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .stagger-reveal"
    );

    scrollElements.forEach((el) => observer.observe(el));

    // Parallax scrolling effect
    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll(
        ".parallax-slow, .parallax-fast"
      );

      parallaxElements.forEach((element) => {
        const speed = element.classList.contains("parallax-slow") ? 0.5 : 0.8;
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    // Throttled scroll handler
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleParallax();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}

// Utility function to add scroll animations to elements
export function addScrollAnimation(
  element: HTMLElement,
  animationType:
    | "reveal"
    | "reveal-left"
    | "reveal-right"
    | "reveal-scale" = "reveal"
) {
  element.classList.add(
    `scroll-reveal${animationType !== "reveal" ? `-${animationType}` : ""}`
  );
}

// Utility function to add staggered animations to container
export function addStaggeredAnimation(container: HTMLElement) {
  container.classList.add("stagger-reveal");
}
