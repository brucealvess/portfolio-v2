import { useEffect, useRef, useState } from "react";

const email = "brucealves.pro@icloud.com";

const socialLinks = [
  {
    label: "LinkedIn",
    detail: "Perfil profissional",
    href: "https://www.linkedin.com/in/brucespan/",
  },
  {
    label: "Instagram",
    detail: "@_brucealves",
    href: "https://www.instagram.com/_brucealves/",
  },
  {
    label: "GitHub",
    detail: "@brucealvess",
    href: "https://github.com/brucealvess",
  },
];

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <rect x="6" y="6" width="10" height="10" rx="2" />
      <path d="M4 13H3.8A1.8 1.8 0 0 1 2 11.2V3.8A1.8 1.8 0 0 1 3.8 2h7.4A1.8 1.8 0 0 1 13 3.8V4" />
    </svg>
  );
}

export default function ContactSection() {
  const copyTimeoutRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => () => clearTimeout(copyTimeoutRef.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <section
      className="contact-section"
      id="contato"
      aria-labelledby="contact-title"
    >
      <div className="contact-section__glow" aria-hidden="true" />

      <div className="contact-section__inner">
        <header className="contact-section__top" data-scroll-reveal="up">
          <div className="contact-section__availability">
            <i aria-hidden="true" />
            Disponível para oportunidades
          </div>
          <span>04 / CONTATO</span>
        </header>

        <div className="contact-section__layout">
          <div className="contact-section__content" data-scroll-reveal="left">
            <p className="contact-section__eyebrow">Tem uma ideia em mente?</p>
            <h2 id="contact-title">
              Vamos criar algo que vale a pena <span>lembrar.</span>
            </h2>
            <p className="contact-section__intro">
              Estou aberto a projetos, colaborações e oportunidades que conectem
              design, tecnologia e boas ideias.
            </p>

            <div className="contact-section__actions">
              <a className="contact-section__primary" href={`mailto:${email}`}>
                <span>Vamos conversar</span>
                <ArrowUpRightIcon />
              </a>
              <button
                className={`contact-section__copy${copied ? " is-copied" : ""}`}
                type="button"
                onClick={copyEmail}
              >
                <CopyIcon />
                <span>{copied ? "E-mail copiado!" : "Copiar e-mail"}</span>
              </button>
            </div>

            <a className="contact-section__email" href={`mailto:${email}`}>
              {email}
            </a>
            <p className="sr-only" aria-live="polite">
              {copied ? "E-mail copiado para a área de transferência." : ""}
            </p>
          </div>

          <aside className="contact-section__social" aria-label="Redes sociais">
            <div className="contact-section__social-header" data-scroll-reveal="right">
              <span>Onde me encontrar</span>
              <span>03 links</span>
            </div>

            {socialLinks.map((link, index) => (
              <a
                data-scroll-reveal="right"
                href={link.href}
                key={link.label}
                target="_blank"
                rel="noreferrer"
                style={{ "--reveal-delay": `${index * 80}ms` }}
              >
                <span>
                  <strong>{link.label}</strong>
                  <small>{link.detail}</small>
                </span>
                <ArrowUpRightIcon />
              </a>
            ))}
          </aside>
        </div>

        <footer className="contact-section__footer" data-scroll-reveal="up">
          <strong>BRUCE ALVES</strong>
          <span>Design · Código · Experiências digitais</span>
          <span>Brasil · 2026</span>
        </footer>
      </div>
    </section>
  );
}
