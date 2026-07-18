import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import logoHorizontal from "../assets/brand/logo-horizontal.svg";

const navigation = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Projetos", href: "#projetos" },
  { label: "Contato", href: "#contato" },
];

const smoothStep = (progress) =>
  progress ** 3 * (progress * (progress * 6 - 15) + 10);

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#inicio");
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });
  const navLinksRef = useRef(null);
  const scrollAnimationRef = useRef(null);

  const stopScrollAnimation = useCallback(() => {
    if (scrollAnimationRef.current !== null) {
      cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }
  }, []);

  const navigateToSection = useCallback((event, href) => {
    const section = document.querySelector(href);

    setMenuOpen(false);
    if (!section) return;

    event.preventDefault();
    setActiveSection(href);
    window.history.pushState(null, "", href);

    stopScrollAnimation();

    const header = document.querySelector(".site-header");
    const headerOffset = href === "#inicio" ? 0 : (header?.offsetHeight ?? 72) + 24;
    const startY = window.scrollY;
    const targetY = Math.max(
      0,
      section.getBoundingClientRect().top + startY - headerOffset,
    );
    const distance = targetY - startY;
    const duration = 1200 + Math.min(Math.abs(distance) * 0.25, 500);
    let startTime = null;

    const animateScroll = (timestamp) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      window.scrollTo(0, startY + distance * smoothStep(progress));

      if (progress < 1) {
        scrollAnimationRef.current = requestAnimationFrame(animateScroll);
      } else {
        scrollAnimationRef.current = null;
      }
    };

    scrollAnimationRef.current = requestAnimationFrame(animateScroll);
  }, [stopScrollAnimation]);

  useEffect(() => {
    const cancelOnUserInput = () => stopScrollAnimation();

    window.addEventListener("wheel", cancelOnUserInput, { passive: true });
    window.addEventListener("touchstart", cancelOnUserInput, { passive: true });

    return () => {
      stopScrollAnimation();
      window.removeEventListener("wheel", cancelOnUserInput);
      window.removeEventListener("touchstart", cancelOnUserInput);
    };
  }, [stopScrollAnimation]);

  const updateIndicator = useCallback(() => {
    const container = navLinksRef.current;
    const activeLink = container?.querySelector(`[href="${activeSection}"]`);

    if (!container || !activeLink) return;

    setIndicator({
      left: activeLink.offsetLeft,
      width: activeLink.offsetWidth,
      ready: true,
    });
  }, [activeSection]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator, menuOpen]);

  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navigation
      .map((item) => document.querySelector(item.href))
      .filter((section) => section && section.offsetHeight > 100);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) {
          setActiveSection(`#${visibleSection.target.id}`);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.15, 0.4, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <nav className="glass-nav" aria-label="Navegação principal">
        <a
          className="brand"
          href="#inicio"
          aria-label="Bruce Alves — Início"
          onClick={(event) => navigateToSection(event, "#inicio")}
        >
          <img
            className="brand__logo"
            src={logoHorizontal}
            alt="Bruce Alves"
            width="5207"
            height="1227"
            decoding="async"
          />
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-menu"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>

        <div
          className={`nav-content${menuOpen ? " is-open" : ""}`}
          id="primary-menu"
        >
          <div className="nav-links" ref={navLinksRef}>
            <span
              className={`nav-indicator${indicator.ready ? " is-ready" : ""}`}
              style={{
                width: `${indicator.width}px`,
                transform: `translateX(${indicator.left}px)`,
              }}
              aria-hidden="true"
            />

            {navigation.map((item) => (
              <a
                className={`nav-link${activeSection === item.href ? " is-active" : ""}`}
                href={item.href}
                key={item.label}
                aria-current={activeSection === item.href ? "location" : undefined}
                onClick={(event) => navigateToSection(event, item.href)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            className="nav-cta"
            href="#contato"
            onClick={(event) => navigateToSection(event, "#contato")}
          >
            <span>Vamos conversar</span>
            <ArrowIcon />
          </a>
        </div>
      </nav>
    </header>
  );
}
