
"use client";
import React, { useEffect, useRef, useState } from 'react';

// Importation des datas des projets
import datas from "../../datas/projectsList.json";
import CardProject from '../CardProject/CardProject';
import ModalProject from '../ModalProject/ModalProject';
import Image from 'next/image';
import { useThemeContext } from '@/_contexts/ThemeContext';

import CinematicProjectsZone from './CinematicProjectsZone/CinematicProjectsZone';

interface ProjectType {
    project_id: number;
    inProgress: boolean;
    themeColor?: {
        light: string;
        dark: string;
    }
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
    //  const projectsWished = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
    const projectsWished = [16, 15, 17, 13]


    const handleBrokenWebsite = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
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

    // Cinematic mode
    const [isCinematicActive, setIsCinematicActive] = useState(false);
    const [cinematicAnnouncement, setCinematicAnnouncement] = useState("");
    const [isShowProjects, setIsShowProjects] = useState(false);

    const secretModeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        if (isCinematicActive && secretModeRef.current) {
            secretModeRef.current?.classList.add('secret-mode-game-zoom');

            setTimeout(() => {
                setCinematicAnnouncement("Appuyez sur la touche Esc pour quitter ce mode d'affichage");
                secretModeRef.current?.requestFullscreen();
            }, 900);

            setTimeout(() => {
                setCinematicAnnouncement("");
                setIsShowProjects(true);
            }, 4000);
        }
    }, [isCinematicActive]);

    const handleCarShowProjects = () => {
        setIsCinematicActive(true);
        setIsShowProjects(true);
    };

    const leaveCinematicMode = () => {
        secretModeRef.current?.classList.add('cinematic-end');

        setTimeout(() => {
            secretModeRef.current?.classList.remove('cinematic-end');
        }, 4000);

        if (document.fullscreenElement) {
            document.exitFullscreen();

        }


        setTimeout(() => {

            secretModeRef.current?.classList.remove('secret-mode-game-zoom');
        }, 1000);


        setIsCinematicActive(false);
        setIsShowProjects(false);
        handleBrokenWebsite();

    }
    // const handleEscapeKey = (event: KeyboardEvent) => {
    //     if (event.key === "Escape") {
    //         leaveCinematicMode();
    //     }
    // };
    // useEffect(() => {
    //     document.addEventListener("keydown", handleEscapeKey);
    //     return () => {
    //         document.removeEventListener("keydown", handleEscapeKey);
    //     };
    // }, []);

    const { theme } = useThemeContext();
    return (
        <section id="portfolio" className="Portfolio">
            <div className={`container ${!displayCar ? "secret-mode-game-active" : ""}`}>
                <h2>Mon Portfolio</h2>
                <p>Un {!displayCar ? <span>nouvel</span> : ""} aperçu de mes projets</p>

                <div className="projects-zone">
                    <ul className="cards-zone">


                        {
                            projectsWished.map((projectWishedId, index) => {
                                const project = datas.find(project => project.project_id === projectWishedId);
                                if (!project) return null;

                                return (
                                    <CardProject
                                        key={project.project_id}
                                        dataCardProject={{
                                            project_id: project.project_id,
                                            inProgress: project.inProgress,
                                            themeColor: project.themeColor,
                                            title: project.title,
                                            year: project.year,
                                            coverSrc: project.coverSrc,
                                            missionResume: project.missionResume,
                                            mission: project.mission,
                                            strongPoints: project.strongPoints,
                                            pictures: project.pictures,
                                            lightHouseSrc: theme === "dark-mode" ? project.lightHouseSrcDark : project.lightHouseSrcLight,
                                            technosUsed: project.technosUsed,
                                            gitHubLink: project.gitHubLink,
                                            websiteLink: project.websiteLink,
                                            isProjectSelected: selectedProject === index
                                        }}
                                        onModalOpen={handleModalOpen}
                                    />
                                );
                            })
                        }
                    </ul>
                    <ul className="select-projects-zone">
                        {datas.filter((project) => projectsWished.includes(project.project_id)).map((e, index) => (
                            <li className={`select ${selectedProject === index ? "select-active" : ""}`} onClick={() => handleSelectProject(index)} key={index}>{index + 1}
                            </li>
                        ))}
                    </ul>
                    {!displayCar &&
                        <div id='secret-mode-game' ref={secretModeRef} className={`secret-mode-game ${isShowProjects ? "projects-are-displayed" : ""}`}>
                            {!cinematicAnnouncement && !isShowProjects &&
                                <div className="buttons-zone">
                                    <button onClick={handleCarShowProjects} className="yes">▶ Commencer</button>
                                    <button onClick={handleBrokenWebsite} className="no">Quitter</button>
                                </div>
                            }
                            {/* {cinematicAnnouncement &&
                                <div className="cinematic-announcement">
                                    {cinematicAnnouncement}
                                </div>
                            } */}
                            {isShowProjects &&
                                <CinematicProjectsZone actionLeave={leaveCinematicMode} />

                            }

                        </div>
                    }

                </div>

                {isModalOpen && currentProject && (
                    <ModalProject onModalClose={handleModalClose}
                        dataModalProject={{
                            themeColor: currentProject.themeColor,
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

            <Image
                onClick={handleBrokenWebsite} className={`car-toogle ${brokenWebsite ? "website-broken" : ""} ${displayCar ? "" : "car-hidden"}`}
                src={`/images/games/${theme === "dark-mode" ? "voiture" : "voiture-light"}.png`}
                title='tut tut !'
                alt="Voiture pouet pouet"
                width={110}
                height={35}
                style={{ width: "auto", height: "auto" }}

            />



        </section>
    );
}

export default Portfolio;