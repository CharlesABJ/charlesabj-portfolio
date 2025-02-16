
"use client";
import React, { useState } from 'react';

// Importation des datas des projets
import datas from "../../datas/projectsList.json";
import CardProject from '../CardProject/CardProject';
import ModalProject from '../ModalProject/ModalProject';
import Image from 'next/image';
import { useThemeContext } from '@/_contexts/ThemeContext';

interface ProjectType {
    project_id: number;
    title: string;
    year: number;
    coverSrc: string;
    missionResume: string;
    mission: string;
    strongPoints: string[];
    pictures: string;
    lightHouseSrc: string;
    technosUsed: string[];
    gitHubLink: string;
    websiteLink?: string;
}

function Portfolio() {

    const [displayCar, setDisplayCar] = useState(true);
    const [brokenWebsite, setBrokenWebsite] = useState(false);


    const handleBrokenWebsite = () => {
        if (typeof window === "undefined") return;

        if (displayCar) {
            setBrokenWebsite(true);
            setTimeout(() => {
                setDisplayCar(false);
                setBrokenWebsite(false);
                window.location.href = "#portfolio";
            }, 2500);
        } else {
            setBrokenWebsite(true);
            setTimeout(() => {
                setDisplayCar(true);
                setBrokenWebsite(false);
                window.location.href = "#portfolio";
            }, 2000);
        }

    }
    const [currentProject, setCurrentProject] = useState<ProjectType | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalOpen = (currentProjectData: ProjectType) => {
        setCurrentProject(currentProjectData);
        setIsModalOpen(true);
    }
    const handleModalClose = () => {
        setIsModalOpen(false);
        setCurrentProject(null);
    }

    const [selectedProject, setSelectedProject] = useState(0);
    const handleSelectProject = (index: number) => {
        setSelectedProject(index);
    }
    const [isCinematicActive, setIsCinematicActive] = useState(false);
    const [cinematicAnnouncement, setCinematicAnnouncement] = useState("");
    const handleCarShowProjects = () => {
        setIsCinematicActive(true);
        const secretModeGame = document.body.
            querySelector("#secret-mode-game");

        if (isCinematicActive) {
            secretModeGame?.classList.add('secret-mode-game-zoom');
            setTimeout(() => {
                secretModeGame?.requestFullscreen();
            }, 900);

            setCinematicAnnouncement("Appuyez sur la touche Escape pour quitter ce mode d'affichage");
            setTimeout(() => {
                setCinematicAnnouncement(" ");
            }, 3000);

        }
    }


    const leaveCinematicMode = () => {
        setIsCinematicActive(false);
        const secretModeGame = document.body.
            querySelector("#secret- mode-game");
        secretModeGame?.classList.remove('secret-mode-game-zoom');
    }

    const { theme } = useThemeContext();

    return (
        <section id="portfolio" className="Portfolio">
            <div className={`container ${!displayCar ? "secret-mode-game-active" : ""}`}>
                <h2>Mon Portfolio</h2>
                <p>Un {!displayCar ? <span>nouvel</span> : ""} aperçu de mes projets</p>

                <div className="projects-zone">
                    <ul className="cards-zone">
                        {datas.slice(0, 4).map((e, index) => (
                            <CardProject key={e.project_id} dataCardProject={{
                                title: e.title,
                                year: e.year,
                                coverSrc: e.coverSrc,
                                missionResume: e.missionResume,
                                mission: e.mission,
                                strongPoints: e.strongPoints,
                                pictures: e.pictures,
                                lightHouseSrc: theme === "dark-mode" ? e.lightHouseSrcDark : e.lightHouseSrcLight,
                                technosUsed: e.technosUsed,
                                gitHubLink: e.gitHubLink,
                                websiteLink: e.websiteLink,
                                isProjectSelected: selectedProject === index // Si l'index du projet est égal à l'index sélectionné, on ajoute la classe "project-selected"

                            }} onModalOpen={handleModalOpen}
                            />
                        ))}
                    </ul>
                    <ul className="select-projects-zone">
                        {datas.slice(0, 4).map((e, index) => (
                            <li className={`select ${selectedProject === index ? "select-active" : ""}`} onClick={() => handleSelectProject(index)} key={index}>{index + 1}
                            </li>
                        ))}
                    </ul>
                    {!displayCar &&
                        <div id='secret-mode-game' className="secret-mode-game">
                            {!cinematicAnnouncement &&
                                <div className="buttons-zone">
                                    <button onClick={handleCarShowProjects} className="yes"></button>
                                    <button onClick={handleBrokenWebsite} className="no">Quitter</button>
                                </div>
                            }
                            {cinematicAnnouncement &&
                                <div className="cinematic-announcement">
                                    {cinematicAnnouncement}

                                </div>}
                        </div>
                    }

                </div>

                {isModalOpen && currentProject && (
                    <ModalProject onModalClose={handleModalClose}
                        dataModalProject={{
                            title: currentProject.title,
                            year: currentProject.year,
                            coverSrc: currentProject.coverSrc,
                            mission: currentProject.mission,
                            strongPoints: currentProject.strongPoints,
                            pictures: currentProject.pictures,
                            lightHouseSrc: currentProject.lightHouseSrc,
                            technosUsed: currentProject.technosUsed,
                            gitHubLink: currentProject.gitHubLink,
                            websiteLink: currentProject.websiteLink
                        }}
                    />
                )}

            </div>
            {/* 
            <Image
                onClick={handleBrokenWebsite} className={`car-toogle ${brokenWebsite ? "website-broken" : ""} ${displayCar ? "" : "car-hidden"}`}
                src={`/images/games/${theme === "dark-mode" ? "voiture" : "voiture"}.png`}
                alt="Voiture pouet pouet"
                width={110}
                height={35}
            /> */}


            {/* Fonctionnalité interactive pour le portfolio :
    1. Lorsqu'on clique sur la voiture, une télévision (en mode plein écran ou modal) apparaît avec deux options : [Play] et [Quitter].

    2. En cliquant sur [Play], on bascule vers une animation où la voiture roule et où les projets défilent en arrière-plan.
        - Chaque projet a une vignette (miniature) qui s’illumine brièvement lorsqu'elle passe en arrière-plan.

    3. En haut à gauche, une série de boutons (1, 2, 3, etc.) correspondant aux projets s’allume successivement.
        - Cliquer sur un bouton fait apparaître le projet correspondant avec une animation de transition de la gauche vers la droite ou inversement.

    4. Pour chaque projet, deux options de présentation sont envisagées :
        - Option Vidéo : Une courte vidéo explicative se déclenche (avec audio) décrivant les caractéristiques et la mission du projet.
        - Option Cartes et Modale** : Une carte pour chaque projet s’affiche. Cliquer sur la carte ouvre une modale avec des détails approfondis et des liens vers GitHub et le projet en ligne.

    5. En cliquant sur le bouton [Quitter], l’utilisateur retourne à l’écran principal.*/}


        </section>
    );
}

export default Portfolio;