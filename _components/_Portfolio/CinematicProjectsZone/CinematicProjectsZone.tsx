import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useThemeContext } from '@/_contexts/ThemeContext';
import { faArrowUpRightFromSquare, faCircleXmark, faFolder, faPlay } from '@fortawesome/free-solid-svg-icons';
import datasProjects from '@/datas/projectsList.json';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const credits = [
    "Marlyse J",
    "Christian J",
    "Open Classrooms",
    "Pascal G",
    "Farouk T",
    "Agence TraindeVies",
    "Kinslay N.",
    "",
    "Yanis M",
    "Mahfoud A",
    "Agence Sequane",
    "Morgan Vuillemin",
    "Céline Laspresses",
    "Françoise S",
    "Laurent Chaillet",
    "Stywell Bouvot",
    "Céline E",
    "Heïdy T",
    "Océane C",
    "Kévin D",
    "Èdouard L",
    "Alexandre F",
    "Jessy-Daniel A",
    ""
]

interface CinematicProjectDisplayProps {
    actionLeave: () => void;
}
function CinematicProjectDisplay({ actionLeave }: CinematicProjectDisplayProps) {
    const { theme } = useThemeContext();
    const [loaded, setLoaded] = useState(false);
    const [currentProject, setCurrentProject] = useState(1);
    const [isFolderOpen, setIsFolderOpen] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isEndOfCinematic, setIsEndOfCinematic] = useState(false);
    const currentProjectData = datasProjects.find(project => project.project_id === currentProject);
    const [carPosition, setCarPosition] = useState("");
    const [isCarLeave, setIsCarLeave] = useState(false);
    const carRef = useRef<HTMLImageElement>(null)
    const cinematicRef = useRef<HTMLDivElement>(null)

    const handleFullScreen = () => {
        if (!document.fullscreenElement) {
            cinematicRef.current?.requestFullscreen();
        }
    }

    const handlePreviousProject = () => {
        setCarPosition("go-left");
        setCurrentProject(currentProject - 1);
        setIsClicked(true);

    }

    const handleNextProject = () => {
        setCarPosition("go-right");
        setCurrentProject(currentProject + 1);
        setIsClicked(true);
    }


    const handleLastProject = () => {
        setIsEndOfCinematic(true);
    }

    const handleCloseCinematic = () => {
        setIsCarLeave(true);
    }

    useEffect(() => {
        if (isCarLeave && carRef.current) {
            carRef.current.style.left = "110%";
            setTimeout(() => {
                actionLeave();
            }, 1000);
        }
    }, [isCarLeave])


    const handleFolderClick = () => {
        setIsFolderOpen(!isFolderOpen)
    }
    const handleFileClick = (fileIndex: number) => {
        setIsFolderOpen(false)
        setCurrentProject(fileIndex)
        setIsClicked(true);
    }


    useEffect(() => {
        if (carRef && carRef.current) {
            if (carPosition === "go-left") {
                carRef.current.style.left = "5%";
            }
            if (carPosition === "go-right") {
                carRef.current.style.left = "40%";
            }
            setTimeout(() => {
                if (carRef && carRef.current) {
                    carRef.current.style.left = "20%";
                }
            }, 1200);


        }
    }, [carPosition, currentProject])

    useEffect(() => {
        if (isClicked) {
            setTimeout(() => {
                setIsClicked(false);
            }, 2200);
        }
    }, [isClicked])


    // On met en place une navigation par clavier

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!document.fullscreenElement) return;

            if (e.key === "ArrowLeft" && currentProject > 1) {
                handlePreviousProject();
            }

            if (e.key === "ArrowRight" && currentProject < datasProjects.length) {
                handleNextProject();
            }
            if (e.key === "Enter" && currentProject === datasProjects.length) {
                handleLastProject();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [currentProject]);


    return (

        window.matchMedia("(orientation: portrait)").matches ? (
            <div className="CinematicProjectDisplay not-available">
                Veuillez passer en mode paysage !
            </div>
        ) : (
            <div
                ref={cinematicRef}
                data-project-color={currentProjectData?.themeColor}
                className="CinematicProjectDisplay"
                style={
                    {
                        '--project-color': currentProjectData?.themeColor.light,
                    } as React.CSSProperties
                }
            >

                {!isEndOfCinematic && (
                    <div onClick={actionLeave} className="leaveButton">
                        <FontAwesomeIcon icon={faPlay} />
                        <span>Sortir</span>
                    </div>
                )}

                {(!isEndOfCinematic) && (
                    <div onClick={handleFullScreen} key={currentProjectData?.project_id}
                        className={`CardOfProject ${currentProjectData?.inProgress ? "in-progress" : ""}`}>
                        {currentProjectData?.coverSrc && currentProjectData?.title && (
                            <div className="cover">
                                {currentProjectData.inProgress && (
                                    <div style={{
                                        "--project-progress-color": currentProjectData.themeColor?.light

                                    } as React.CSSProperties} className="button-in-progress">
                                        <div className="container-zone">
                                            En cours
                                        </div>
                                    </div>
                                )}
                                <div className="overlay"></div>
                                <Image
                                    src={currentProjectData.coverSrc}
                                    alt={currentProjectData.title}
                                    width={500}
                                    height={500}
                                    onLoadingComplete={() => setLoaded(true)}
                                />
                            </div>
                        )}
                        <div className="content">
                            <div className="title-and-date">
                                <h3>{currentProjectData!.title}</h3>
                                <p>{currentProjectData!.year}</p>
                            </div>
                            <div
                                title={`Il s'agit de mon ${currentProjectData!.project_id === 1
                                    ? "tout 1er projet !"
                                    : currentProjectData!.project_id === datasProjects.length
                                        ? `${currentProjectData!.project_id}ᵉ et dernier projet en cours !`
                                        : `${currentProjectData!.project_id}ᵉ projet !`
                                    }`}
                                className="id-of-creation"
                            >
                                <p>{currentProjectData!.project_id}</p>
                            </div>

                        </div >
                        <div className="button-zone">
                            {currentProjectData!.websiteLink && (
                                <Link target="_blank" href={currentProjectData!.websiteLink!} className="website-link">
                                    <span><span className="text">Accès au site</span><FontAwesomeIcon icon={faArrowUpRightFromSquare} /></span>
                                </Link>
                            )}
                            {currentProjectData!.gitHubLink && (
                                <Link target="_blank" href={currentProjectData!.gitHubLink} className="github-link">
                                    <span><span className="text">Voir le code</span><FontAwesomeIcon icon={faGithub} /></span>
                                </Link>
                            )}

                        </div>
                    </div >
                )}

                <div onClick={handleFullScreen} className="sky">
                    <div className="sky-bg"></div>

                    {isEndOfCinematic && (
                        <div className="end-of-cinematic-text">
                            Waouh, vous êtes vraiment allé·e jusqu’au bout ?<br />
                            Merci sincèrement pour votre attention 😁 <br />
                            <br />
                            D’autres projets sont en préparation... <br />
                            En attendant, n’hésitez pas à me contacter pour échanger !
                            <div className="close-button" onClick={handleCloseCinematic}>
                                Fermer
                            </div>
                        </div>
                    )}

                    {!isEndOfCinematic && (
                        <>
                            {isFolderOpen ? (
                                <div
                                    className="list-of-projects files">
                                    <FontAwesomeIcon
                                        className="close-button"
                                        icon={faCircleXmark}
                                        onClick={handleFolderClick}
                                    />

                                    {datasProjects.map((project, index) => {
                                        const isActive = index + 1 === currentProject;

                                        return (
                                            <div
                                                style={{
                                                    '--files-color': project.themeColor?.light,
                                                } as React.CSSProperties}
                                                key={index}
                                                className={`icon-file ${isActive ? "active" : ""} ${isClicked ? "clicked" : ""}`}
                                                onClick={() => handleFileClick(index + 1)}
                                            >
                                                <svg width="25" height="30" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M2 1H10.7778L17 7.34884V21C17 21.5523 16.5523 22 16 22H2C1.44772 22 1 21.5523 1 21V2C1 1.44772 1.44772 1 2 1Z" fill="white" />
                                                    <path d="M10.7778 1V6.34884C10.7778 6.90112 11.2255 7.34884 11.7778 7.34884H17M10.7778 1H2C1.44772 1 1 1.44772 1 2V21C1 21.5523 1.44772 22 2 22H16C16.5523 22 17 21.5523 17 21V7.34884M10.7778 1L17 7.34884" stroke="black" />
                                                </svg>

                                                <span>{index + 1}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div title={`Dossier de ${datasProjects.length} projets`} className="list-of-projects folder" onClick={handleFolderClick}>
                                    <FontAwesomeIcon icon={faFolder} />
                                    <span className="number-of-project">{datasProjects.length}</span>
                                </div>
                            )}
                        </>
                    )}
                    {!isEndOfCinematic && (
                        <div className="description">
                            <h3 className='title'>{currentProjectData!.title}</h3>
                            <div
                                className="mission"
                                dangerouslySetInnerHTML={{ __html: currentProjectData?.cinematicResume ?? currentProjectData!.mission }}
                            />
                            <ul className="technos-used">
                                {currentProjectData!.technosUsed.map((techno, index) => (
                                    <li key={index}>
                                        {techno}
                                        {index < currentProjectData!.technosUsed.length - 1 && " – "}
                                    </li>

                                ))}

                            </ul>
                        </div>
                    )}
                </div>




                <div onClick={handleFullScreen} className="floor">
                    {!isEndOfCinematic && (
                        <div className="navigation">


                            <div onClick={handlePreviousProject} className={`navigation-button prev ${currentProject === 1 ? "disabled" : ""}` + (isClicked ? " clicked" : "")} >
                                <FontAwesomeIcon icon={faPlay} />
                                <span className='previous-project-index'>{currentProject - 1}</span>
                            </div>

                            {currentProject === datasProjects.length ? (
                                <div onClick={handleLastProject} className={`navigation-button next ${isClicked ? "clicked" : ""}`}>
                                    <FontAwesomeIcon className="navigation-button next" icon={faPlay} />
                                    <span className='next-project-index'>Fin</span>
                                </div>
                            ) : (
                                <div onClick={handleNextProject} className={`navigation-button next ${isClicked ? "clicked" : ""}`}>
                                    <FontAwesomeIcon className="navigation-button next" icon={faPlay} />
                                    <span className='next-project-index'>{currentProject + 1}</span>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="line"></div>

                    <Image
                        ref={carRef}
                        className="yellow-car"
                        src={`/images/games/${theme === "dark-mode" ? "voiture-light" : "voiture-light"}.png`}
                        alt="Voiture pouet pouet"
                        width={110}
                        height={35}
                    />

                </div>
            </div >
        )
    );
}

export default CinematicProjectDisplay;


//  Mettre des credit à la fin lorsqu'on sort comme dans les jeux vidéos 
// Par exemple lister le nom des agences, des mentors et de toutes les personnes qui m'ont permis d'avancer 
