"use client";
import { faFacebookMessenger, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import { useThemeContext } from '@/app/_contexts/ThemeContext';

function Footer() {
    const { theme } = useThemeContext();

    if (!theme) {
        return null;
    }
    return (
        <footer className="Footer">
            <h3>Charles ABJ</h3>
            <p>Développeur Front-End</p>
            <nav>
                <ul>
                    <li><a href="#about">À propos</a></li>
                    <li><a href="#skills">Compétences</a></li>
                    <li><a href="#portfolio">Projets</a></li>
                </ul>
            </nav>

            <ul className="social-networks">
                <li>
                    <a
                        href="https://github.com/CharlesABJ"
                        title="GitHub"
                        rel="noopener noreferrer"
                        target="_blank">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.linkedin.com/in/charlesabj-78753b182/"
                        title="LinkedIn"
                        rel="noopener noreferrer"
                        target="_blank">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                </li>
                <li>
                    <a title="Messenger"
                        href="https://m.me/100094215251917"
                        target="_blank"
                        rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebookMessenger} />
                    </a>
                </li>
            </ul>

            <p className='copyright'>© 2023 • Make with ❤️ By CharlesABJ </p>

            <ScrollToTop />
        </footer>
    );
}

export default Footer;