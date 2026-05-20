import { motion } from 'motion/react';
import intfocPresentation from './assets/intfoc_presentation.png';
import reactComponentPlayground from './assets/react_component_playground_presentation.png';
import { GitHub, LinkedIn, Medium } from './assets/svgs';
import ExternalLink from './components/ExternalLink';
import Header from './components/Header';
import SectionHeading from './components/SectionHeading';

const PROJECTS = [
  {
    name: 'React Component Playground',
    href: 'https://albho-react-component-playground.vercel.app/',
    image: reactComponentPlayground,
    imageAlt: 'React Component Playground interface',
    description:
      'A component playground for exploring how common web UI components should behave in real production scenaries.',
    tech: [
      { name: 'React', href: 'https://react.dev' },
      { name: 'TypeScript', href: 'https://www.typescriptlang.org/' },
      { name: 'Sass', href: 'https://sass-lang.com/' },
    ],
  },
  {
    name: 'IntFoc',
    href: 'https://intfoc.ca',
    image: intfocPresentation,
    imageAlt: 'IntFoc timer interface',
    description: (
      <>
        A work and study timer app featuring real&#8209;time progress feedback,
        persistent session history, and a responsive, keyboard&#8209;accessible
        UI.
      </>
    ),
    tech: [
      { name: 'React', href: 'https://react.dev' },
      { name: 'TypeScript', href: 'https://www.typescriptlang.org/' },
      { name: 'Tailwind CSS', href: 'https://tailwindcss.com/' },
      { name: 'Motion', href: 'https://motion.dev/' },
    ],
  },
];

const SOCIALS = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/albert-ho-vancouver/',
    Icon: LinkedIn,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/albho',
    Icon: GitHub,
  },
  {
    name: 'Medium',
    href: 'https://albert-ho.medium.com/',
    Icon: Medium,
  },
];

const motionProps = {
  variants: {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  },
  initial: 'hidden',
  animate: 'visible',
  transition: { duration: 0.5, ease: 'easeOut' },
} as const;

export default function App() {
  return (
    <div className="mx-auto min-h-screen max-w-2xl p-6 text-[var(--text-primary)]">
      <Header />

      <main className="my-28">
        <motion.header {...motionProps}>
          <h1 className="font-mono text-4xl font-semibold">Albert Ho</h1>

          <p className="mt-4 text-lg leading-8 text-[var(--text-secondary)]">
            Hi there, I'm Albert. I'm a frontend engineer based in Vancouver.
          </p>

          <p className="mt-2 text-lg leading-8 text-balance text-[var(--text-secondary)]">
            I'm a frontend engineer focused on React and TypeScript. I like
            building intuitive interfaces that make complex product
            functionality easier to use.
          </p>
        </motion.header>

        <motion.hr
          className="my-10 border-dashed border-[var(--line)]"
          {...motionProps}
          transition={{ ...motionProps.transition, delay: 0.1 }}
        />

        <motion.section
          {...motionProps}
          transition={{ ...motionProps.transition, delay: 0.2 }}
        >
          <SectionHeading id="experience">Experience</SectionHeading>

          <article className="mt-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium">Frontend Engineer</h3>

                <ExternalLink
                  href="https://picovoice.ai"
                  className="mt-1 text-base text-[var(--link)] underline decoration-[var(--line)] underline-offset-4 hover:text-[var(--link-hover)] hover:decoration-current"
                >
                  Picovoice Inc.
                </ExternalLink>
              </div>

              <time className="shrink-0 text-base text-[var(--text-muted)]">
                2022 — 2026
              </time>
            </div>

            <p className="mt-4 text-base leading-7 text-[var(--text-secondary)]">
              Owned frontend platforms across marketing and product experiences.
              Maintained user&#8209;facing React interfaces that supported 2x
              user growth and product adoption.
            </p>
          </article>
        </motion.section>

        <motion.hr
          className="my-10 border-dashed border-[var(--line)]"
          {...motionProps}
          transition={{ ...motionProps.transition, delay: 0.3 }}
        />

        <motion.section
          {...motionProps}
          transition={{ ...motionProps.transition, delay: 0.4 }}
        >
          <SectionHeading id="projects">Projects</SectionHeading>

          <div className="mt-5 space-y-12">
            {PROJECTS.map(
              ({ name, href, image, imageAlt, description, tech }) => (
                <article key={name}>
                  <img
                    src={image}
                    alt={imageAlt}
                    className="w-full object-cover"
                  />

                  <div className="mt-5">
                    <h3 className="font-medium">
                      <ExternalLink
                        href={href}
                        className="text-[var(--link)] underline decoration-[var(--line)] underline-offset-4 hover:text-[var(--link-hover)] hover:decoration-current"
                      >
                        {name}
                      </ExternalLink>
                    </h3>

                    <p className="mt-2 text-base leading-7 text-[var(--text-secondary)]">
                      {description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-sm text-[var(--text-muted)]">
                      {tech.map(({ name, href }) => (
                        <a
                          key={name}
                          href={href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="transition-colors before:content-['`'] after:content-['`'] hover:text-[var(--text-primary)]"
                        >
                          {name}
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
        </motion.section>

        <motion.hr
          className="my-10 border-dashed border-[var(--line)]"
          {...motionProps}
          transition={{ ...motionProps.transition, delay: 0.5 }}
        />

        <motion.section
          {...motionProps}
          transition={{ ...motionProps.transition, delay: 0.6 }}
        >
          <SectionHeading id="connect">Connect</SectionHeading>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
            {SOCIALS.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-2 text-base text-[var(--link)] underline decoration-[var(--line)] underline-offset-4 transition-colors hover:text-[var(--link-hover)] hover:decoration-current"
              >
                <Icon />
                {name}
              </a>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
