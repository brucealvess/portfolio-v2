import bikcraftPreview from "../assets/projects/bikcraft.webp";
import bruceLinksPreview from "../assets/projects/bruce-links.webp";
import portfolioV1Preview from "../assets/projects/portfolio-v1.webp";
import raaCvPreview from "../assets/projects/raa-cv.webp";

const projects = [
  {
    number: "02",
    slug: "bikcraft",
    title: "Bikcraft",
    category: "Front-end · Projeto de estudo",
    year: "2023",
    description:
      "Website completo para uma marca de bicicletas elétricas, com páginas de produtos, seguros, orçamento e contato.",
    tags: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://brucealvess.github.io/bikecraft.github.io/",
    codeUrl: "https://github.com/brucealvess/bikecraft.github.io",
  },
  {
    number: "03",
    slug: "portfolio",
    title: "Portfólio v1",
    category: "Design pessoal · Front-end",
    year: "2026",
    description:
      "Primeira versão do meu portfólio pessoal, criada para apresentar formação, habilidades e canais de contato.",
    tags: ["UI Design", "HTML", "CSS", "JavaScript"],
    liveUrl: "https://brucealvess.github.io/",
    codeUrl: "https://github.com/brucealvess/brucealvess.github.io",
  },
  {
    number: "04",
    slug: "links",
    title: "Bruce Links",
    category: "Social Media · Link in bio",
    year: "2025",
    description:
      "Página compacta de links pessoais, pensada para reunir perfis e destinos importantes em uma interface direta.",
    tags: ["Social Media", "HTML", "CSS"],
    liveUrl: "https://brucealvess.github.io/links.github.io/",
    codeUrl: "https://github.com/brucealvess/links.github.io",
  },
];

function ArrowUpRightIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" />
    </svg>
  );
}

function ProjectPreview({ slug }) {
  if (slug === "bikcraft") {
    return (
      <div className="project-preview project-preview--bikcraft" aria-hidden="true">
        <div className="project-browser-bar"><i /><i /><i /><span>bikcraft.com</span></div>
        <img
          className="project-preview__image"
          src={bikcraftPreview}
          alt=""
          width="1600"
          height="773"
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  if (slug === "portfolio") {
    return (
      <div className="project-preview project-preview--portfolio" aria-hidden="true">
        <div className="project-browser-bar"><i /><i /><i /><span>brucealvess.github.io</span></div>
        <img
          className="project-preview__image"
          src={portfolioV1Preview}
          alt=""
          width="927"
          height="784"
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <div className="project-preview project-preview--links" aria-hidden="true">
      <div className="project-browser-bar"><i /><i /><i /><span>bruce.links</span></div>
      <img
        className="project-preview__image"
        src={bruceLinksPreview}
        alt=""
        width="1600"
        height="769"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      className="projects-section"
      id="projetos"
      aria-labelledby="projects-title"
    >
      <div className="projects-section__container">
        <header className="projects-section__header" data-scroll-reveal="up">
          <p className="projects-section__eyebrow">
            <span>03</span>
            Projetos selecionados
          </p>
          <div>
            <h2 id="projects-title">
              Ideias construídas para
              <span>funcionar no mundo real.</span>
            </h2>
            <p>
              Uma seleção de projetos em que conecto design, código e comunicação
              para criar experiências digitais claras e úteis.
            </p>
          </div>
        </header>

        <article className="featured-project">
          <a
            className="featured-project__preview"
            data-scroll-reveal="left"
            href="https://ronaldoalves78.github.io/raa-portfolio/"
            target="_blank"
            rel="noreferrer"
            aria-label="Abrir projeto RAA CV"
          >
            <div className="project-browser-bar"><i /><i /><i /><span>raa-cv.com</span></div>
            <img
              className="featured-project__image"
              src={raaCvPreview}
              alt="Página inicial do portfólio profissional RAA CV"
              width="1600"
              height="775"
              loading="lazy"
              decoding="async"
            />
            <span className="project-preview__open"><ArrowUpRightIcon /></span>
          </a>

          <div className="featured-project__content" data-scroll-reveal="right">
            <div className="project-card__meta">
              <span>01 / Projeto em destaque</span>
              <span>2026</span>
            </div>
            <p className="project-card__category">Design &amp; Desenvolvimento · Projeto para cliente</p>
            <h3>RAA CV</h3>
            <p className="project-card__description">
              Portfólio profissional desenvolvido para apresentar experiência em
              qualidade, processos, produção e PCP com uma linguagem visual técnica,
              organizada e orientada ao setor industrial.
            </p>
            <ul className="project-card__tags" aria-label="Tecnologias do RAA CV">
              <li>UI Design</li>
              <li>Design System</li>
              <li>HTML</li>
              <li>CSS</li>
            </ul>
            <div className="project-card__links">
              <a href="https://ronaldoalves78.github.io/raa-portfolio/" target="_blank" rel="noreferrer">
                Ver projeto <ArrowUpRightIcon />
              </a>
              <a href="https://github.com/ronaldoalves78/raa-portfolio" target="_blank" rel="noreferrer">
                Ver código
              </a>
            </div>
          </div>
        </article>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <article className={`project-card project-card--${project.slug}`} key={project.slug}>
              <a
                className="project-card__preview-link"
                data-scroll-reveal={index % 2 === 0 ? "left" : "right"}
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Abrir projeto ${project.title}`}
              >
                <ProjectPreview slug={project.slug} />
                <span className="project-preview__open"><ArrowUpRightIcon /></span>
              </a>
              <div
                className="project-card__body"
                data-scroll-reveal="up"
                style={{ "--reveal-delay": "90ms" }}
              >
                <div className="project-card__meta">
                  <span>{project.number} / {project.category}</span>
                  <span>{project.year}</span>
                </div>
                <h3>{project.title}</h3>
                <p className="project-card__description">{project.description}</p>
                <ul className="project-card__tags" aria-label={`Tecnologias do ${project.title}`}>
                  {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                <div className="project-card__links">
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    Ver projeto <ArrowUpRightIcon />
                  </a>
                  <a href={project.codeUrl} target="_blank" rel="noreferrer">GitHub</a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <footer className="projects-section__footer" data-scroll-reveal="scale">
          <div>
            <span>Próximo projeto</span>
            <h3>Sua ideia pode entrar aqui.</h3>
          </div>
          <a href="#contato">Vamos criar algo <ArrowUpRightIcon /></a>
        </footer>
      </div>
    </section>
  );
}
