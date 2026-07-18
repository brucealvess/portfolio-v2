const specialties = [
  "Vibe Coding",
  "Vibe Design",
  "UI/UX",
  "Front-end",
  "Social Media",
];

const courses = [
  {
    title: "Front-end & UX/UI Design",
    institution: "Origamid",
    duration: "126h",
    year: "2024",
  },
  {
    title: "Pacote Office",
    institution: "Escola de Profissões ONLINE",
    duration: "96h",
    year: "2022",
  },
  {
    title: "Gestão e Administrativo",
    institution: "Escola de Profissões ONLINE",
    duration: "40h",
    year: "2023",
  },
  {
    title: "Windows 10",
    institution: "Escola de Profissões ONLINE",
    duration: "20h",
    year: "2023",
  },
];

const process = [
  {
    number: "01",
    title: "Entender",
    text: "Começo pelo objetivo, pelo público e pela mensagem que precisa ser comunicada.",
  },
  {
    number: "02",
    title: "Criar",
    text: "Transformo referências e ideias em uma direção visual clara, útil e atraente.",
  },
  {
    number: "03",
    title: "Evoluir",
    text: "Uso design, código e IA para testar possibilidades, aprender e melhorar cada entrega.",
  },
];

export default function AboutSection() {
  return (
    <section
      className="about-section"
      id="sobre"
      aria-labelledby="about-title"
    >
      <div className="about-section__grid" aria-hidden="true" />
      <span className="about-section__watermark" aria-hidden="true">02</span>

      <div className="about-section__container">
        <header className="about-section__header" data-scroll-reveal="up">
          <p className="about-section__eyebrow">
            <span>02</span>
            Sobre mim
          </p>
          <h2 id="about-title">
            Criatividade para imaginar.
            <span>Tecnologia para realizar.</span>
          </h2>
        </header>

        <div className="about-section__layout">
          <div className="about-section__story">
            <p className="about-section__lead" data-scroll-reveal="left">
              Sou um criador digital em formação, movido pela curiosidade e pela
              vontade de transformar boas ideias em experiências que funcionam.
            </p>
            <p data-scroll-reveal="left">
              Minha base começou no Front-end e no UX/UI Design. Hoje amplio esse
              repertório com Vibe Coding, Vibe Design e Social Media, usando
              inteligência artificial como ferramenta para explorar, prototipar e
              construir com mais agilidade — sem abrir mão de intenção e qualidade.
            </p>

            <div className="about-section__process" aria-label="Meu processo criativo">
              {process.map((item, index) => (
                <article
                  className="about-process-card"
                  data-scroll-reveal="left"
                  key={item.number}
                  style={{ "--reveal-delay": `${index * 80}ms` }}
                >
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>

            <article className="about-values-card" data-scroll-reveal="scale">
              <div className="about-values-card__topline">
                <span>Como trabalho</span>
                <span>Valores</span>
              </div>
              <h3>Curiosidade para explorar. Responsabilidade para entregar.</h3>
              <p>
                Gosto de aprender fazendo, colaborar com pessoas e conduzir cada
                ideia com foco, clareza e vontade de evoluir.
              </p>
              <ul aria-label="Qualidades profissionais">
                <li>Proatividade</li>
                <li>Foco</li>
                <li>Resiliência</li>
                <li>Trabalho em equipe</li>
                <li>Aprendizado rápido</li>
              </ul>
              <img
                className="about-values-card__mark"
                src="/favicon.svg"
                alt=""
                aria-hidden="true"
              />
            </article>
          </div>

          <aside className="about-section__cards" aria-label="Formação e competências">
            <article className="about-card about-card--education" data-scroll-reveal="right">
              <div className="about-card__topline">
                <span>Formação acadêmica</span>
                <span className="about-card__status">Em andamento</span>
              </div>
              <div>
                <strong>2026—2029</strong>
                <h3>Análise e Desenvolvimento de Sistemas</h3>
                <p>Universidade São Francisco</p>
              </div>
            </article>

            <div className="about-section__card-row">
              <article className="about-card about-card--metric" data-scroll-reveal="up">
                <span>Formação complementar</span>
                <strong>282<small>h</small></strong>
                <p>Quatro cursos complementares concluídos</p>
              </article>

              <article
                className="about-card about-card--mindset"
                data-scroll-reveal="up"
                style={{ "--reveal-delay": "90ms" }}
              >
                <span>Meu diferencial</span>
                <strong>Entender.<br />Criar.<br />Evoluir.</strong>
              </article>
            </div>

            <article className="about-card about-card--courses" data-scroll-reveal="right">
              <div className="about-card__topline">
                <span>Cursos concluídos</span>
                <span>04 formações</span>
              </div>
              <div className="about-courses-list">
                {courses.map((course) => (
                  <div className="about-course" key={course.title}>
                    <div>
                      <h3>{course.title}</h3>
                      <p>{course.institution}</p>
                    </div>
                    <p className="about-course__meta">
                      <strong>{course.duration}</strong>
                      <span>{course.year}</span>
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="about-card about-card--skills" data-scroll-reveal="right">
              <div className="about-card__topline">
                <span>Onde conecto ideias</span>
                <span>05 frentes</span>
              </div>
              <ul>
                {specialties.map((specialty) => (
                  <li key={specialty}>{specialty}</li>
                ))}
              </ul>
            </article>
          </aside>
        </div>
      </div>
    </section>
  );
}
