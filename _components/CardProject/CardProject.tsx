import { useThemeContext } from '@/_contexts/ThemeContext';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React, { useState } from 'react';

interface PropsCardProject {
    dataCardProject: {
        project_id: number;
        inProgress?: boolean;
        themeColor?: {
            light: string;
            dark: string;
        };
        title: string;
        year: number;
        coverSrc: string;
        pictures: string;
        lightHouseSrc?: string;
        lightHouseSrcDark?: string;
        missionResume: string;
        mission: string;
        strongPoints: string[];
        technosUsed: string[];
        gitHubLink?: string;
        websiteLink?: string;
        isProjectSelected?: boolean;
    };
    onModalOpen: (dataCardProject: any) => void;
}

function CardProject({ dataCardProject, onModalOpen }: PropsCardProject) {
    const themeContext = useThemeContext();
    const isDarkMode = themeContext.theme === 'dark-mode';
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <li key={dataCardProject.project_id}
            className={`CardProject ${dataCardProject.isProjectSelected ? "project-selected" : ""} id-${dataCardProject.project_id} ${dataCardProject.inProgress ? "in-progress" : ""} ${isLoaded ? "loaded" : "not-loaded"} `}
            style={{
                '--project-color': isDarkMode
                    ? dataCardProject.themeColor?.dark
                    : dataCardProject.themeColor?.light
            } as React.CSSProperties}
        >

            {dataCardProject.websiteLink ? (
                <a href={dataCardProject.websiteLink} target="_blank" className="cover">
                    {dataCardProject.inProgress && (
                        <div style={{
                            "--project-progress-color": dataCardProject.themeColor?.light

                        } as React.CSSProperties}
                            className="button-in-progress" >
                            <div className="container-zone">
                                En cours
                            </div>
                        </div>
                    )}
                    <div className="overlay"></div>
                    <Image
                        src={dataCardProject.coverSrc}
                        width={580}
                        height={400}
                        alt={dataCardProject.title}
                        priority
                        onLoad={() => setIsLoaded(true)}
                    />
                </a>
            ) : (
                <div className="cover">
                    {dataCardProject.inProgress && (
                        <div style={{
                            "--project-progress-color": dataCardProject.themeColor?.light

                        } as React.CSSProperties}
                            className="button-in-progress">
                            <div className="container-zone">
                                En cours
                            </div>
                        </div>
                    )}
                    <div className="overlay"></div>
                    <Image
                        onLoad={() => setIsLoaded(true)}
                        src={dataCardProject.coverSrc}
                        width={580} height={400}
                        alt={dataCardProject.title}
                        priority
                    />
                </div>
            )}

            <div className="content">
                <div className="description">
                    <h3 className="title">{dataCardProject.title}</h3>
                    <p className="mission">{dataCardProject.missionResume}</p>
                    <button
                        onClick={() => onModalOpen(dataCardProject)}
                        className="see-more"
                    >
                        Voir plus
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
                <ul className="technos-used">
                    {dataCardProject.technosUsed.map((techno) => (
                        <li className="techno" key={techno}>
                            {techno}
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    );
}

export default CardProject;