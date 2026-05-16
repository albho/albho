import { Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const getVancouverTime = () =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Vancouver',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(new Date());

const getInitialTheme = (): Theme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';

const applyTheme = (theme: Theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.classList.toggle('light', theme === 'light');
};

const applyThemeWithoutTransitions = (theme: Theme) => {
  document.documentElement.classList.add('theme-transition-disabled');
  applyTheme(theme);

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      document.documentElement.classList.remove('theme-transition-disabled');
    });
  });
};

export default function Header() {
  const [time, setTime] = useState(getVancouverTime);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [isThemeSwitching, setIsThemeSwitching] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTime(getVancouverTime());
    }, 30_000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = () => {
      if (localStorage.getItem('theme')) return;

      const nextTheme: Theme = media.matches ? 'dark' : 'light';
      applyThemeWithoutTransitions(nextTheme);
      setTheme(nextTheme);
    };

    media.addEventListener('change', handleSystemThemeChange);
    return () => media.removeEventListener('change', handleSystemThemeChange);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';

    setIsThemeSwitching(true);
    applyThemeWithoutTransitions(nextTheme);
    localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);

    window.requestAnimationFrame(() => {
      setIsThemeSwitching(false);
    });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-x-0 top-0 z-50 bg-[var(--header-bg)] backdrop-blur-md"
      transition={{ duration: 0.45, ease: 'easeOut', delay: 0.15 }}
    >
      <div className="mx-auto flex max-w-2xl items-center justify-between p-6 text-base">
        <time
          dateTime={new Date().toISOString()}
          className="font-mono tabular-nums text-[var(--text-secondary)]"
        >
          Vancouver • {time}
        </time>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="grid size-9 place-items-center text-[var(--text-secondary)] transition hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--line)]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              initial={{ opacity: 0, rotate: -20, scale: 0.85 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 20, scale: 0.85 }}
              transition={{
                duration: isThemeSwitching ? 0 : 0.18,
                ease: 'easeOut',
              }}
            >
              {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </motion.header>
  );
}
