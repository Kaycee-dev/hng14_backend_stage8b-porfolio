import {
  ArrowRight,
  ExternalLink,
  Github,
  Mail,
  MapPin,
} from "lucide-react";
import { featured, profile, projects, reflection, skills } from "@/lib/portfolio-content";

const navItems = [
  { label: "Profile", href: "#profile" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Featured", href: "#featured" },
  { label: "Reflection", href: "#reflection" },
  { label: "Contact", href: "#contact" },
];

const backendProjects = projects.filter((project) => project.track === "Backend");
const devopsProjects = projects.filter((project) => project.track === "DevOps");
const projectLabelById = new Map(
  projects.map((project) => [project.id, project.stage])
);

function SectionHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="mb-3 font-mono text-xs font-medium uppercase text-accent">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 text-base leading-relaxed text-text-secondary">
          {intro}
        </p>
      ) : null}
    </div>
  );
}

function ProofLinks({
  links,
}: {
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link) => (
        <a
          key={`${link.label}-${link.href}`}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-secondary px-3 py-1.5 font-mono text-[11px] text-text-secondary transition-colors hover:border-border-bright hover:text-text-primary"
        >
          {link.label}
          <ExternalLink size={12} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <article
      id={`project-${project.id}`}
      className="flex h-full max-w-full flex-col overflow-hidden rounded-lg border border-border bg-bg-card p-5"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[11px] font-medium uppercase text-accent">
          {project.stage}
        </span>
        {project.team ? (
          <span className="rounded border border-border-bright px-2 py-0.5 font-mono text-[10px] uppercase text-text-secondary">
            Team repo
          </span>
        ) : null}
        {project.featured ? (
          <a
            href="#featured"
            className="inline-flex items-center gap-1 rounded border border-accent/40 px-2 py-0.5 font-mono text-[10px] uppercase text-accent"
          >
            Deep dive
            <ArrowRight size={11} aria-hidden="true" />
          </a>
        ) : null}
      </div>
      <h3 className="font-display text-xl font-bold text-text-primary">
        {project.name}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-text-secondary">
        {project.description}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-1.5 sm:flex sm:flex-wrap">
        {project.stack.map((item) => (
          <span
            key={`${project.id}-${item}`}
            className="min-w-0 rounded border border-border bg-bg-secondary px-2 py-0.5 font-mono text-[11px] text-text-muted"
          >
            {item}
          </span>
        ))}
      </div>
      <p className="mt-4 max-w-full text-sm leading-relaxed text-text-primary">
        <span className="font-mono text-[11px] uppercase text-accent">
          Built:
        </span>{" "}
        {project.built}
      </p>
      <p className="mt-3 max-w-full text-sm leading-relaxed text-text-secondary">
        <span className="font-mono text-[11px] uppercase text-accent">
          Proof:
        </span>{" "}
        {project.proof}
      </p>
      <div className="mt-5">
        <ProofLinks links={project.links} />
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-bg-secondary/95 backdrop-blur">
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between gap-4 overflow-hidden px-6 py-4"
          aria-label="Primary"
        >
          <a
            href="#profile"
            className="font-display text-2xl font-bold text-accent"
            aria-label="Kelechi Uba profile"
          >
            KU
          </a>
          <ul className="hidden items-center gap-5 lg:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${profile.email}`}
            aria-label={`Email ${profile.name}`}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent text-bg-primary transition-colors hover:bg-accent-dim sm:h-auto sm:w-auto sm:gap-2 sm:px-3 sm:py-2 sm:text-sm sm:font-semibold"
          >
            <Mail size={15} aria-hidden="true" />
            <span className="hidden sm:inline">Contact</span>
          </a>
        </nav>
      </header>

      <main>
        <section
          id="profile"
          className="mx-auto grid max-w-6xl gap-10 overflow-hidden px-6 py-16 lg:grid-cols-[1.2fr_0.8fr]"
        >
          <div>
            <p className="mb-4 font-mono text-xs font-medium uppercase text-accent">
              HNG14 Stage 8b
            </p>
            <h1 className="font-display text-4xl font-bold text-text-primary sm:text-6xl">
              {profile.name}
            </h1>
            <p className="mt-3 font-display text-2xl font-semibold text-text-secondary">
              {profile.title}
            </p>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-text-secondary">
              {profile.bio.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <aside className="max-w-full overflow-hidden rounded-lg border border-border bg-bg-card p-5">
            <p className="font-mono text-xs font-medium uppercase text-accent">
              Profile
            </p>
            <div className="mt-4 space-y-4 text-sm text-text-secondary">
              <p className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-accent" aria-hidden="true" />
                <span className="min-w-0">
                  {profile.timezone}; {profile.availability}
                </span>
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 transition-colors hover:text-text-primary"
              >
                <Mail size={16} className="text-accent" aria-hidden="true" />
                {profile.email}
              </a>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-text-primary"
              >
                <Github size={16} className="text-accent" aria-hidden="true" />
                {profile.githubLabel}
              </a>
              <p className="break-all">
                <span className="font-mono text-[11px] uppercase text-accent">
                  LinkedIn:
                </span>{" "}
                {profile.linkedinText}
              </p>
            </div>
          </aside>
        </section>

        <section id="projects" className="border-y border-border bg-bg-secondary/40">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <SectionHeader
              eyebrow="Projects"
              title="Backend work first, DevOps as support"
              intro="Backend systems carry the page; DevOps work supports platform, CI, deployment, and container skills."
            />

            <div className="space-y-10">
              <div>
                <h3 className="mb-4 font-display text-2xl font-semibold text-text-primary">
                  Backend
                </h3>
                <div className="grid gap-4 overflow-hidden md:grid-cols-2">
                  {backendProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-display text-2xl font-semibold text-text-primary">
                  Supporting DevOps
                </h3>
                <p className="mb-4 max-w-3xl text-sm leading-relaxed text-text-secondary">
                  I was also a DevOps intern in HNG14; this work backs the
                  platform and CI skills above.
                </p>
                <div className="grid gap-4 overflow-hidden md:grid-cols-2">
                  {devopsProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="mx-auto max-w-6xl px-6 py-14">
            <SectionHeader
              eyebrow="Skills"
              title="Every skill points back to a project"
              intro="Only ledger-backed skills appear here."
          />
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <article
                key={skill.name}
                className="rounded-lg border border-border bg-bg-card p-4"
              >
                <h3 className="font-display text-lg font-semibold text-text-primary">
                  {skill.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {skill.detail}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {skill.projects.map((projectId) => (
                    <a
                      key={`${skill.name}-${projectId}`}
                      href={`#project-${projectId}`}
                      className="rounded border border-border bg-bg-secondary px-2 py-0.5 font-mono text-[10px] text-text-muted transition-colors hover:border-border-bright hover:text-text-primary"
                    >
                      {projectLabelById.get(projectId)}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="featured" className="border-y border-border bg-bg-secondary/40">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <SectionHeader
              eyebrow="Featured deep-dive"
              title={featured.title}
              intro="The Stage 8 event store is the one project with deeper architecture detail."
            />
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <article className="rounded-lg border border-border bg-bg-card p-5">
                <h3 className="font-display text-xl font-semibold text-text-primary">
                  Problem
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {featured.problem}
                </p>
                <h3 className="mt-6 font-display text-xl font-semibold text-text-primary">
                  Architecture / request flow
                </h3>
                <ol className="mt-3 space-y-3">
                  {featured.flow.map((step) => (
                    <li
                      key={step}
                      className="rounded border border-border bg-bg-secondary p-3 font-mono text-xs leading-relaxed text-text-secondary"
                    >
                      {step}
                    </li>
                  ))}
                </ol>
              </article>

              <article className="rounded-lg border border-border bg-bg-card p-5">
                <h3 className="font-display text-xl font-semibold text-text-primary">
                  Key modules
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                  {featured.modules.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <h3 className="mt-6 font-display text-xl font-semibold text-text-primary">
                  Key endpoints
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-text-secondary">
                  {featured.endpoints.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <h3 className="mt-6 font-display text-xl font-semibold text-text-primary">
                  Challenge solved
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {featured.challenge}
                </p>
                <p className="mt-4 rounded border border-accent/30 bg-accent/10 p-3 font-mono text-xs leading-relaxed text-accent">
                  {featured.caveat}
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="reflection" className="mx-auto max-w-6xl px-6 py-14">
            <SectionHeader
              eyebrow="Reflection"
              title="What changed in how I build"
              intro="Specific lessons only."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {reflection.map((item) => (
              <p
                key={item}
                className="rounded-lg border border-border bg-bg-card p-4 text-sm leading-relaxed text-text-secondary"
              >
                {item}
              </p>
            ))}
          </div>
        </section>

        <section id="contact" className="border-t border-border bg-bg-secondary/60">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-mono text-xs font-medium uppercase text-accent">
                Contact
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-text-primary">
                Reach Kelechi Uba
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                Email and GitHub are the reliable public contact points.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-bg-primary transition-colors hover:bg-accent-dim"
              >
                <Mail size={15} aria-hidden="true" />
                Email
              </a>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-card px-4 py-2 text-sm text-text-primary transition-colors hover:border-border-bright"
              >
                <Github size={15} aria-hidden="true" />
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
