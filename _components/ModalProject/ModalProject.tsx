import { useThemeContext } from '@/_contexts/ThemeContext';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightFromSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ModalProjectProps {
    dataModalProject: {
        themeColor?: {
            light: string;
            dark: string;
        };
        title: string;
        year: number;
        coverSrc: string;
        pictures: string;
        lightHouseSrc: string;
        mission: string;
        strongPoints: string[];
        technosUsed: string[];
        gitHubLink: string;
        websiteLink?: string;
    };
    onModalClose: () => void;
}

function ModalProject({ dataModalProject, onModalClose }: ModalProjectProps) {
    const themeContext = useThemeContext();
    const isDarkMode = themeContext.theme === 'dark-mode';
    return (
        <div
            key={dataModalProject.title}
            className="ModalProject"

        >
            <div onClick={onModalClose} className="overlay toggle"></div>
            <div className="modal">
                <FontAwesomeIcon onClick={onModalClose} className="close-modal" icon={faXmark} />
                <div
                    className="project"
                    style={{
                        '--project-color': isDarkMode ? dataModalProject.themeColor?.dark : dataModalProject.themeColor?.light
                    } as React.CSSProperties}
                >
                    <div className="presentation">
                        <div className="cover">
                            <Image src={dataModalProject.coverSrc} width={580} height={400} alt={dataModalProject.title} />
                        </div>
                        <div className="content">
                            <h3 className="title">{dataModalProject.title}</h3>
                            <h4 className="year">Année : <span>{dataModalProject.year}</span></h4>

                            <h4>Mission :</h4>
                            <p className="mission"
                                dangerouslySetInnerHTML={{ __html: dataModalProject.mission }}
                            />

                            {/* Points forts avec vérification */}
                            {dataModalProject.strongPoints?.length > 0 && (
                                <>
                                    <h4>Points forts et réalisations :</h4>
                                    <ul className="strong-points">
                                        {dataModalProject.strongPoints.map((point) => (
                                            <li key={point}>{point}</li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {/* Technologies utilisées */}
                            {dataModalProject.technosUsed?.length > 0 && (
                                <>
                                    <h4>Technologies utilisées :</h4>
                                    <ul className="technos-used">
                                        {dataModalProject.technosUsed.map((techno) => (
                                            <li className='techno' key={techno}>{techno}</li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            <div className={`links ${dataModalProject.gitHubLink && dataModalProject.websiteLink ? 'has-two-links' : ''}`}>
                                {dataModalProject.gitHubLink && (
                                    <a title='Voir le code sur Github'
                                        href={dataModalProject.gitHubLink}
                                        className="github-link"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        Code <FontAwesomeIcon icon={faGithub} />
                                    </a>
                                )}
                                {dataModalProject.websiteLink && (
                                    <a title='Voir le site'
                                        href={dataModalProject.websiteLink}
                                        className="website-link"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        Voir le site <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Images et scores Lighthouse */}
                    <div className="pictures-and-lighthouse-score">
                        {dataModalProject.pictures && (
                            <div className="pictures">
                                <img src={dataModalProject.pictures} alt={`Aperçu ${dataModalProject.title}`} />
                            </div>
                        )}
                        {dataModalProject.lightHouseSrc && (
                            <div className="lighthouse-score">
                                <img src={dataModalProject.lightHouseSrc} alt="Score Lighthouse" />
                            </div>
                        )}
                    </div>

                    <Link className="contact-link" onClick={onModalClose} href="#contact" rel="noopener noreferrer">
                        <div className="text-content">Contactez moi !</div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ModalProject;