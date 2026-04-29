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

export default function Header() {
  const [time, setTime] = useState(getVancouverTime);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

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
      applyTheme(nextTheme);
      setTheme(nextTheme);
    };

    media.addEventListener('change', handleSystemThemeChange);
    return () => media.removeEventListener('change', handleSystemThemeChange);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';

    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: 0.15 }}
    >
      <div className="flex items-baseline justify-between text-sm">
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
          className="grid size-9 place-items-center rounded-lg text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              initial={{ opacity: 0, rotate: -20, scale: 0.85 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 20, scale: 0.85 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </motion.header>
  );
}
