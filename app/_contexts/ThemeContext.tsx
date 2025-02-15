"use client";

import { createContext, useContext, useState, useEffect } from "react";


// 1) Création du contexte
export const ThemeContext = createContext({
    theme: null as string | null,
    setTheme: (theme: string | null) => { },
});


// 2) Initialisation du contexte (Provider)
export function ThemeContextProvider({ children }: { children: React.ReactNode }) { // On met React.ReactNode pour dire que children peut être n'importe quel type de composant React
    const [theme, setTheme] = useState<string | null>(null);

    useEffect(() => {
        const localTheme = localStorage.getItem('theme');
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        if (localTheme) {
            setTheme(localTheme);
            document.body.className = localTheme;
        } else if (mediaQuery.matches) {
            setTheme('dark-mode');
            document.body.className = 'dark-mode';
        } else {
            setTheme('light-mode');
            document.body.className = 'light-mode';
        }
    }, []);

    const valueThemeContext = {
        theme,
        setTheme,
    }
    return (
        <ThemeContext.Provider value={valueThemeContext}>
            {children}
        </ThemeContext.Provider>
    )
}

// 3) Consommation du contexte
export const useThemeContext = () => useContext(ThemeContext); // On crée un hook pour consommer le contexte

