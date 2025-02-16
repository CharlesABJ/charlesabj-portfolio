"use client"
import { useThemeContext } from '@/_contexts/ThemeContext';
import { faBarsStaggered, faMoon, faSun, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Navicon from '../NavIcon/Navicon';

function Header() {
    const [isOpenNav, setIsOpenNav] = useState(false);
    const { theme, setTheme } = useThemeContext();

    const lightLogo = "/images/logos/logo-light.webp";
    const darkLogo = "/images/logos/logo-dark.webp";

    const homeIcon = <Navicon dataNavicon={{ icon: "home" }} />
    const aboutIcon = <Navicon dataNavicon={{ icon: "about" }} />
    const portfolioIcon = <Navicon dataNavicon={{ icon: "portfolio" }} />
    const skillsIcon = <Navicon dataNavicon={{ icon: "skills" }} />
    const contactIcon = <Navicon dataNavicon={{ icon: "contact" }} />


    // Liste des liens de navigation
    const desktopNav = [
        { id: 1, title: 'À propos', link: '#about' },
        { id: 2, title: 'Portfolio', link: '#portfolio' },
        { id: 3, title: 'Compétences', link: '#skills' },
        { id: 4, title: 'Me contacter', link: '#contact' }
    ]

    // Liste des liens de navigation en responsive
    const responsiveNav = [
        { id: 1, title: 'Accueil', icon: homeIcon, link: '#home' },
        { id: 2, title: 'À propos', icon: aboutIcon, link: '#about' },
        { id: 3, title: 'Portfolio', icon: portfolioIcon, link: '#portfolio' },
        { id: 4, title: 'Compétences', icon: skillsIcon, link: '#skills' },
        { id: 5, title: 'Me contacter', icon: contactIcon, link: '#contact' }
    ]

    // Changer le thème
    const handleChangeMode = () => {
        if (typeof window === "undefined") return;
        if (theme === "light-mode") {
            localStorage.setItem('theme', "dark-mode");
            document.body.classList.add("dark-mode");
            setTheme("dark-mode");
        } else {
            localStorage.setItem('theme', "light-mode");
            document.body.classList.remove("dark-mode");
            setTheme("light-mode");
        }
    }

    // Ouvrir ou fermer le menu de navigation
    const handleOpenNav = () => {
        setIsOpenNav(!isOpenNav);
    }

    // Mettre le lien de navigation actif en surbrillance
    useEffect(() => {

        const handleScroll = () => {
            if (typeof window === "undefined") return;

            const logo = document.querySelector('.logo');
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('nav ul li a');
            const skills = document.querySelector("nav a[href='#skills']");
            const headerHeight = 80 + 1; // Hauteur du header + 1px de bordure

            sections.forEach((section) => {
                const topOfPage = window.scrollY; // Position du haut de la fenêtre par rapport au haut de la page
                const sectionOffSetTop = section.offsetTop - headerHeight; // Position du haut de la section par rapport au haut de la page
                const sectionHeight = section.offsetHeight; // Hauteur de la section
                const sectionId = section.getAttribute('id');

                if (topOfPage >= sectionOffSetTop && topOfPage < sectionOffSetTop + sectionHeight) { // Si la position du haut de la fenêtre est supérieure ou égale à la position du haut de la section ET  que la position du haut de la fenêtre  est inférieure à la position du haut de la section + la hauteur de la section
                    navLinks.forEach((link) => {
                        logo?.classList.remove('active');
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                        if (sectionId === 'home') {
                            logo?.classList.add('active');
                        }
                        if (sectionId === 'recommendations') {
                            skills?.classList.add('active');
                        }

                    });
                }
            });
        };

        window.addEventListener('scroll', handleScroll);

        // Nettoyer l'écouteur d'événements lorsque le composant est démonté
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Le tableau vide signifie que cet effet s'exécute une seule fois après le montage du composant


    if (!theme) {
        return null;
    }


    return (
        <header className="Header">
            <Link className={`logo ${isOpenNav ? 'hidden-by-nav-open' : ''}`} href='#home'>
                <Image src={theme === "light-mode" ? lightLogo : darkLogo} alt="Logo" width={48} height={48} />
            </Link>

            <nav className={isOpenNav ? 'nav-is-open' : 'nav-is-closed'}>
                <ul className='desktop-nav hidden-for-tablet'>
                    {desktopNav.map((item) => (
                        <li key={item.id}>
                            <Link href={`${item.link}`}>{item.title}</Link>
                        </li>
                    ))}
                </ul>
                <ul className={`responsive-nav displayed-for-tablet ${isOpenNav ? 'displayed-by-nav-open' : 'hidden-by-nav-open'}`}>
                    {
                        responsiveNav.map((item) => (
                            <li key={item.id}>
                                <Link href={`${item.link}`}>{item.icon}</Link>
                            </li>
                        ))
                    }
                </ul>
                <FontAwesomeIcon onClick={handleChangeMode} className={`dark-mode-toggle ${isOpenNav ? 'hidden-by-nav-open' : ''}`} icon={theme === "light-mode" ? faMoon : faSun} />
            </nav>

            <FontAwesomeIcon
                onClick={handleOpenNav}
                className="displayed-for-tablet nav-toggle"
                icon={isOpenNav ? faXmark : faBarsStaggered}
            />
        </header>
    );
}

export default Header;