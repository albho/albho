import type { ReactNode } from 'react';

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function ExternalLink({
  href,
  children,
  className = '',
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={`group inline-flex items-center gap-1 transition-colors ${className}`}
    >
      <span>{children}</span>

      <svg
        aria-hidden="true"
        focusable="false"
        className="size-[0.9em] -translate-x-0.25 translate-y-0.25 transition-transform duration-150 ease-out group-hover:translate-x-0.25 group-hover:-translate-y-0.25"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
      >
        <path d="m243-192-51-51 429-429H384v-72h360v360h-72v-237L243-192Z" />
      </svg>
    </a>
  );
}
