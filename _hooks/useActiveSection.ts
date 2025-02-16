// useActiveSection.tsx
"use client";

import { useEffect, useState } from 'react';

function useActiveSection(sectionIds: string[]) {
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            sectionIds.forEach((sectionId) => {
                const section = document.getElementById(sectionId);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    const sectionIsVisible = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;

                    if (sectionIsVisible) {
                        setActiveSection(sectionId);
                    }
                }
            });
        };

        // Attache l'événement de défilement
        window.addEventListener("scroll", handleScroll);

        // Nettoie l'événement lors du démontage du composant
        return () => window.removeEventListener("scroll", handleScroll);
    }, [sectionIds]);

    return activeSection;
}

export default useActiveSection;