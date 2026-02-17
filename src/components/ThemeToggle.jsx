import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ className = "" }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl transition-all duration-300 ${theme === 'dark'
                    ? 'bg-white/5 text-brightTeal hover:bg-white/10'
                    : 'bg-midnightBlue/5 text-royalBlue hover:bg-midnightBlue/10'
                } ${className}`}
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? (
                <Sun size={20} className="drop-shadow-[0_0_8px_rgba(60,178,184,0.5)]" />
            ) : (
                <Moon size={20} className="drop-shadow-[0_0_8px_rgba(34,123,206,0.3)]" />
            )}
        </button>
    );
};

export default ThemeToggle;
