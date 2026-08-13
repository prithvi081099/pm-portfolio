import { useEffect, useState } from 'react';

const profile = {
  github: 'https://github.com/prithvi081099',
  linkedin: 'https://www.linkedin.com/in/prithvimalhotra/',
  email: 'mailto:prithvimalhotra41@gmail.com',
  resume: './images/Prithvi_Malhotra_Software_Engineer.pdf',
};

const impact = [
  { value: '500–700', label: 'daily requests handled by Rokt AI Code Guru, an internal knowledge base' },
  { value: '30%', label: 'engineer productivity improvement' },
  { value: '~$100K', label: 'annual licensing cost avoided' },
  { value: '4×', label: 'faster pre-merge CI feedback' },
];

const experience = [
  {
    company: 'Rokt',
    role: 'Software Engineer',
    location: 'Seattle, WA',
    dates: 'Jul 2025 — Aug 2026',
    summary: 'AI and developer tooling, secure MCP platforms, and high-leverage build and release systems.',
    bullets: [
      'Architected and led end-to-end development of an in-house Observe MCP, enabling natural-language observability queries with privilege-aware dataset access; improved engineer productivity by 30% and avoided ~$100K per year in licensing costs.',
      'Architected and productized Rokt AI Code Guru, an internal knowledge base and MCP-based developer tool using Python, LangChain, and Google Vertex AI to automate codebase context retrieval, handling 500–700 requests per day.',
      'Engineered secure MCP integrations by unifying transport layers across distributed services, implementing custom JWT authentication, and enforcing zero-trust access control.',
      'Reduced CI/CD time from ~25 to 6–7 minutes pre-merge and ~20 to ~5 minutes post-merge through selective C# builds; deployed services to AWS ECS via CodeDeploy blue/green deployments.',
      'Architected autoscaling for GitHub Actions and CI runners using KEDA and Karpenter, cutting PR-check wait time from 3–4 minutes to under 15 seconds.',
      'Supported the migration from AWS ECS and CodeDeploy to EKS, implementing ArgoCD-based GitOps delivery for Kubernetes services.',
    ],
    stack: ['Python', 'MCP', 'LangChain', 'Vertex AI', 'C#', 'GitHub Actions', 'KEDA', 'Karpenter', 'AWS ECS', 'EKS', 'ArgoCD'],
  },
  {
    company: 'GHOST Research Group',
    role: 'Research Assistant',
    location: 'Boulder, CO',
    dates: 'Sep 2024 — Jun 2025',
    summary: 'Distributed simulation and cloud analytics for network research.',
    bullets: [
      'Designed a Java and Spring Boot orchestrator-worker system coordinating up to 8 Selenium-driven KVM virtual machines for concurrent population web-behavior simulation.',
      'Built a Wi-Fi analytics pipeline with AWS S3, Athena, Lambda, and CloudWatch, achieving ~95% faster data processing.',
      'Automated AWS infrastructure and deployments with Terraform, Jenkins, Docker, and Ansible, reducing manual configuration time by 70%.',
    ],
    stack: ['Java', 'Spring Boot', 'AWS', 'Terraform', 'KVM', 'Selenium', 'Docker', 'Ansible'],
  },
  {
    company: 'LTIMindtree',
    role: 'Software Development Engineer',
    location: 'Pune, India',
    dates: 'Jul 2021 — Jun 2023',
    summary: 'Transaction-processing and backend systems for HSBC.',
    bullets: [
      'Engineered systems that transformed XML and SIF transactions into HSBC’s standardized internal format for consistent downstream processing.',
      'Developed 20+ Java and Spring Boot REST APIs and optimized PostgreSQL queries and indexing, improving database performance by 30%.',
      'Led an HSBC project team and strengthened testing with JUnit, Mockito, and Cucumber, contributing to a 40% reduction in post-deployment defects.',
    ],
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Kafka', 'AWS', 'Kubernetes', 'JUnit'],
  },
  {
    company: 'SpaceUp Technologies',
    role: 'Software Engineering Intern',
    location: 'Mumbai, India',
    dates: 'Mar 2020 — Jul 2020',
    summary: 'Search, cloud-native microservices, and GitOps delivery.',
    bullets: [
      'Migrated legacy search to Elasticsearch, improving query performance by 18% and enabling full-text search across the application.',
      'Deployed Go microservices on AWS EKS using Docker, Kubernetes, KEDA, Istio, and Prometheus; automated GitOps deployments with GitHub Actions and ArgoCD.',
    ],
    stack: ['Go', 'Elasticsearch', 'AWS EKS', 'Kubernetes', 'KEDA', 'Istio', 'ArgoCD', 'GitOps'],
  },
];

const skills = [
  { title: 'Languages', items: ['Python', 'Java', 'C++', 'Go', 'C#', 'Bash', 'SQL'] },
  { title: 'AI & developer tooling', items: ['MCP', 'LangChain', 'Google Vertex AI'] },
  { title: 'Cloud', items: ['AWS', 'ECS', 'EKS', 'CodeDeploy', 'S3', 'Athena', 'Lambda', 'CloudWatch', 'Google Cloud Run'] },
  { title: 'Infrastructure & delivery', items: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Concourse', 'Jenkins', 'ArgoCD', 'Ansible', 'GitOps'] },
  { title: 'Backend & data', items: ['Spring Boot', 'REST APIs', 'PostgreSQL', 'Elasticsearch', 'Apache Kafka'] },
  { title: 'Systems & observability', items: ['Linux', 'KVM', 'Selenium', 'KEDA', 'Istio', 'Prometheus', 'Observe'] },
];

const projects = [
  {
    title: 'Distributed Online Marketplace',
    label: 'Distributed systems',
    description: 'A scalable marketplace backend with microservices, fault-tolerant replication using Raft consensus, and custom rotating-sequencer protocols.',
    image: './images/Distributed.png',
    stack: ['Go', 'Raft', 'gRPC', 'MySQL'],
  },
  {
    title: 'Automatic Music Separation',
    label: 'Cloud infrastructure',
    description: 'A containerized audio-separation service on Kubernetes, provisioned with Terraform and backed by Redis task queues and MinIO object storage.',
    image: './images/music_separation.png',
    stack: ['AWS', 'Kubernetes', 'Terraform', 'Python'],
  },
  {
    title: 'Distributed File Systems',
    label: 'Systems programming',
    description: 'Reliable distributed storage, a caching and content-filtering web proxy, and a multithreaded HTTP server built around low-level networking.',
    image: './images/Distributed_file.png',
    stack: ['C', 'Sockets', 'Multithreading', 'TCP/IP'],
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className={scrolled ? 'nav-wrap nav-wrap--scrolled' : 'nav-wrap'}>
        <nav className="nav container" aria-label="Primary navigation">
          <a className="wordmark" href="#home" onClick={closeMenu} aria-label="Prithvi Malhotra, home">
            <span>PM</span>
            <span className="wordmark__dot" />
          </a>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
          <div id="main-menu" className={menuOpen ? 'nav-links nav-links--open' : 'nav-links'}>
            <a href="#work" onClick={closeMenu}>Experience</a>
            <a href="#skills" onClick={closeMenu}>Expertise</a>
            <a href="#projects" onClick={closeMenu}>Projects</a>
            <a href={profile.email}>Email <Arrow /></a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero container" id="home">
          <div className="hero__content">
            <p className="eyebrow"><span className="status-dot" /> Software engineer · Greater Seattle</p>
            <h1>I build reliable software for complex, real-world <em>problems.</em></h1>
            <p className="hero__lede">
              I’m Prithvi Malhotra, a software engineer experienced in AI-powered applications, backend platforms, distributed systems, and cloud infrastructure.
            </p>
            <div className="hero__actions">
              <a className="button button--primary" href="#work">Explore my work <span aria-hidden="true">↓</span></a>
              <a className="button button--secondary" href={profile.resume} target="_blank" rel="noreferrer">View résumé <Arrow /></a>
            </div>
            <div className="hero__links" aria-label="External profiles">
              <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
              <a href={profile.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
              <a href={profile.email}>Email <Arrow /></a>
            </div>
          </div>
          <div className="hero__portrait-wrap" aria-hidden="true">
            <div className="hero__orbit hero__orbit--one" />
            <div className="hero__orbit hero__orbit--two" />
            <div className="hero__portrait">
              <img src="./images/Prithvi-Image2.jpg" alt="" />
            </div>
            <span className="hero__code-chip">systems / ai / cloud</span>
          </div>
        </section>

        <section className="impact-band" aria-labelledby="impact-title">
          <div className="container">
            <div className="section-kicker"><span>01</span><p id="impact-title">Selected impact</p></div>
            <div className="impact-grid">
              {impact.map((item) => (
                <article className="impact-stat" key={item.value + item.label}>
                  <strong>{item.value}</strong>
                  <p>{item.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section container" id="work">
          <div className="section-heading">
            <div className="section-kicker"><span>02</span><p>Experience</p></div>
            <h2>Production work with measurable outcomes.</h2>
            <p>From internal AI platforms to distributed backends and deployment systems, I focus on leverage: making complex engineering work simpler, faster, and more reliable.</p>
          </div>
          <div className="experience-list">
            {experience.map((job, index) => (
              <article className="experience-card" key={job.company}>
                <div className="experience-card__index">0{index + 1}</div>
                <div className="experience-card__meta">
                  <p>{job.dates}</p>
                  <p>{job.location}</p>
                </div>
                <div className="experience-card__body">
                  <div className="experience-card__title">
                    <div>
                      <p className="experience-card__company">{job.company}</p>
                      <h3>{job.role}</h3>
                    </div>
                  </div>
                  <p className="experience-card__summary">{job.summary}</p>
                  <ul>
                    {job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                  <div className="tag-list" aria-label={`${job.company} technologies`}>
                    {job.stack.map((item) => <span key={item}>{item}</span>)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--dark" id="skills">
          <div className="container">
            <div className="section-heading section-heading--dark">
              <div className="section-kicker"><span>03</span><p>Technical expertise</p></div>
              <h2>A focused toolkit for building dependable platforms.</h2>
            </div>
            <div className="skills-grid">
              {skills.map((group, index) => (
                <article className="skill-group" key={group.title}>
                  <span className="skill-group__number">0{index + 1}</span>
                  <h3>{group.title}</h3>
                  <p>{group.items.join(' · ')}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section container" id="projects">
          <div className="section-heading section-heading--row">
            <div>
              <div className="section-kicker"><span>04</span><p>Selected projects</p></div>
              <h2>Engineering from first principles.</h2>
            </div>
            <p>Projects that sharpened my foundations in distributed systems, infrastructure, networking, and backend design.</p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.title}>
                <div className="project-card__image">
                  <img src={project.image} alt={`${project.title} project preview`} />
                  <span>0{index + 1}</span>
                </div>
                <div className="project-card__body">
                  <p className="project-card__label">{project.label}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tag-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section credentials">
          <div className="container credentials__grid">
            <div>
              <div className="section-kicker"><span>05</span><p>Education</p></div>
              <h2>Strong foundations, applied in production.</h2>
            </div>
            <div className="credential-list">
              <article>
                <p>2025</p>
                <div><h3>Master of Science, Computer Science</h3><span>University of Colorado Boulder</span></div>
              </article>
              <article>
                <p>2021</p>
                <div><h3>Bachelor of Technology, Electronics & Communication</h3><span>Mumbai University</span></div>
              </article>
              <a href="https://www.credly.com/badges/0fb24746-2193-4032-bbac-0b37a1395188/public_url" target="_blank" rel="noreferrer">
                <p>Credential</p>
                <div><h3>AWS Certified Developer — Associate <Arrow /></h3><span>Amazon Web Services</span></div>
              </a>
            </div>
          </div>
        </section>

        <section className="contact container" id="contact">
          <p className="eyebrow">Have an interesting engineering problem?</p>
          <h2>Let’s build something<br /><em>useful.</em></h2>
          <a className="contact__email" href={profile.email}>prithvimalhotra41@gmail.com <Arrow /></a>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <p>© 2026 Prithvi Malhotra</p>
          <div><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href="#home">Back to top ↑</a></div>
        </div>
      </footer>
    </div>
  );
}

export default App;
