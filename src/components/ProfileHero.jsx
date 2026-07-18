import { useEffect, useRef } from "react";
import profilePhotoLarge from "../assets/images/profile-1600.webp";
import profilePhotoSmall from "../assets/images/profile-960.webp";

const smoothStep = (progress) =>
  progress ** 3 * (progress * (progress * 6 - 15) + 10);

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 3v13M5.5 11.5 10 16l4.5-4.5" />
    </svg>
  );
}

export default function ProfileHero() {
  const heroRef = useRef(null);
  const visualRef = useRef(null);
  const photoRef = useRef(null);
  const scrollAnimationRef = useRef(null);

  const handleSmoothNavigation = (event, href) => {
    const section = document.querySelector(href);

    if (!section) return;

    event.preventDefault();
    window.history.pushState(null, "", href);
    cancelAnimationFrame(scrollAnimationRef.current);

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
  };

  useEffect(() => {
    const hero = heroRef.current;
    const visual = visualRef.current;
    const photo = photoRef.current;
    const desktop = window.matchMedia("(min-width: 900px)");
    let animationFrame;

    if (!hero || !visual || !photo) return undefined;

    const resetParallax = () => {
      visual.style.setProperty("--visual-parallax-x", "0px");
      visual.style.setProperty("--visual-parallax-y", "0px");
      photo.style.setProperty("--photo-parallax-x", "0px");
    };

    const handlePointerMove = (event) => {
      if (!desktop.matches) {
        resetParallax();
        return;
      }

      const bounds = hero.getBoundingClientRect();
      const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;

      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        visual.style.setProperty("--visual-parallax-x", `${normalizedX * -12}px`);
        visual.style.setProperty("--visual-parallax-y", `${normalizedY * -8}px`);
        photo.style.setProperty("--photo-parallax-x", `${normalizedX * 18}px`);
      });
    };

    hero.addEventListener("pointermove", handlePointerMove, { passive: true });
    hero.addEventListener("pointerleave", resetParallax);

    return () => {
      cancelAnimationFrame(animationFrame);
      cancelAnimationFrame(scrollAnimationRef.current);
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", resetParallax);
    };
  }, []);

  return (
    <section
      className="profile-hero"
      id="inicio"
      aria-labelledby="hero-title"
      ref={heroRef}
    >
      <div className="profile-hero__grid" aria-hidden="true" />

      <div className="profile-hero__inner">
        <div className="profile-hero__content">
          <p className="profile-hero__eyebrow">
            <span className="profile-hero__status" aria-hidden="true" />
            Disponível para oportunidades
          </p>

          <h1 id="hero-title">
            <span className="profile-hero__title-line">
              <span className="profile-hero__title-text">Ideias que viram</span>
            </span>
            <span className="profile-hero__title-line profile-hero__title-line--accent">
              <span className="profile-hero__title-text profile-hero__title-text--accent">
                experiências digitais.
              </span>
            </span>
          </h1>

          <p className="profile-hero__description">
            Sou Bruce Alves, Desenvolvedor Criativo &amp; Designer Digital. Combino
            Vibe Coding, UI/UX, Front-end e Social Media para transformar ideias
            em interfaces e conteúdos claros, atraentes e funcionais.
          </p>

          <div className="profile-hero__actions">
            <a
              className="hero-button hero-button--primary"
              href="#projetos"
              onClick={(event) => handleSmoothNavigation(event, "#projetos")}
            >
              <span>Ver meus projetos</span>
              <ArrowUpRightIcon />
            </a>
            <a
              className="hero-button hero-button--secondary"
              href="#sobre"
              onClick={(event) => handleSmoothNavigation(event, "#sobre")}
            >
              Sobre mim
            </a>
          </div>

          <ul className="profile-hero__disciplines" aria-label="Áreas de atuação">
            <li>Vibe Coding</li>
            <li>Vibe Design</li>
            <li>UI/UX</li>
            <li>Front-end</li>
            <li>Social Media</li>
          </ul>
        </div>

        <div className="profile-hero__visual" ref={visualRef}>
          <span className="profile-hero__edition" aria-hidden="true">
            PORTFÓLIO / 2026
          </span>
          <div className="profile-hero__orbit profile-hero__orbit--outer" aria-hidden="true" />
          <div className="profile-hero__orbit profile-hero__orbit--inner" aria-hidden="true" />

          <div className="profile-hero__portrait">
            <span className="profile-hero__index" aria-hidden="true">01</span>
            <div className="profile-hero__portrait-glow" aria-hidden="true" />
            <img
              className="profile-hero__photo"
              src={profilePhotoSmall}
              srcSet={`${profilePhotoSmall} 960w, ${profilePhotoLarge} 1600w`}
              sizes="(max-width: 899px) 32rem, 42vw"
              alt="Retrato de Bruce Alves"
              width="1600"
              height="1789"
              decoding="async"
              fetchPriority="high"
              ref={photoRef}
            />
            <div className="profile-hero__nameplate">
              <span className="profile-hero__nameplate-dot" aria-hidden="true" />
              <p><strong>Bruce Alves</strong>Desenvolvedor Criativo &amp; Designer Digital</p>
            </div>
          </div>

          <div className="profile-hero__floating-card" aria-hidden="true">
            <span>Foco atual</span>
            <strong>IA + Design + Código</strong>
          </div>
        </div>
      </div>

      <a
        className="profile-hero__scroll-cue"
        href="#sobre"
        onClick={(event) => handleSmoothNavigation(event, "#sobre")}
      >
        <span>Conheça meu trabalho</span>
        <ArrowDownIcon />
      </a>
    </section>
  );
}
