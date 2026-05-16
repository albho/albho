import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

interface SectionHeadingProps {
  id: string;
  children: ReactNode;
}

export default function SectionHeading({ id, children }: SectionHeadingProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const copyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;

    try {
      await navigator.clipboard.writeText(url);
      window.history.replaceState(null, '', `#${id}`);
      setCopied(true);

      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);

      timeoutRef.current = window.setTimeout(() => {
        setCopied(false);
      }, 1200);
    } catch {
      window.location.hash = id;
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <h2 id={id}>
      <button
        type="button"
        onClick={copyLink}
        className="
          group -ml-5 flex items-center
          cursor-pointer
          text-base font-semibold uppercase tracking-widest
          text-[var(--text-muted)]
          transition hover:text-[var(--text-primary)]
        "
      >
        <span className="mr-2 flex w-3 items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="text-emerald-500"
              >
                ✓
              </motion.span>
            ) : (
              <span
                key="hash"
                className="
                  text-[var(--text-muted)]
                  opacity-0
                  transition-opacity duration-150
                  group-hover:opacity-100
                  group-focus-visible:opacity-100
                "
              >
                #
              </span>
            )}
          </AnimatePresence>
        </span>

        {children}
      </button>
    </h2>
  );
}
