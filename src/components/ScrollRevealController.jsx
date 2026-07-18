import { useEffect } from "react";

export default function ScrollRevealController() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-scroll-reveal]");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-revealed"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.addEventListener(
            "animationend",
            () => entry.target.classList.add("reveal-complete"),
            { once: true },
          );
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -9% 0px",
        threshold: 0.08,
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
