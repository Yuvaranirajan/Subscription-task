import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 cursor-pointer dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? (
        <Sun className="w-5 h-5 rotate-0 transition-transform duration-500" />
      ) : (
        <Moon className="w-5 h-5 rotate-[360deg] transition-transform duration-500" />
      )}
    </button>
  );
};

export default ThemeToggle;
