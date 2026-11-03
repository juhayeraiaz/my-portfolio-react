import { LuMoon, LuSun } from 'react-icons/lu';
import { useTheme } from '../../hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      className="icon-btn theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      {theme === 'dark' ? <LuSun aria-hidden="true" /> : <LuMoon aria-hidden="true" />}
    </button>
  );
}
