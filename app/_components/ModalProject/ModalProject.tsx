import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightFromSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface ModalProjectProps {
    dataModalProject: {
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
    return (
        <div className="ModalProject">
            <div onClick={onModalClose} className="overlay toggle"></div>
            <div className="modal">
                <FontAwesomeIcon onClick={onModalClose} className="close-modal" icon={faXmark} />
                <div className="project">
                    <div className="presentation">
                        <div className="cover">
                            <img src={dataModalProject.coverSrc} alt={`Aperçu ${dataModalProject.title}`} />
                        </div>
                        <div className="content">
                            <h3 className="title">{dataModalProject.title}</h3>
                            <h4 className="year">Année : <span>{dataModalProject.year}</span></h4>

                            <h4>Mission :</h4>
                            <p className="mission">{dataModalProject.mission}</p>

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

                            <div className="links">
                                <a title='Voir le code sur Github'
                                    href={dataModalProject.gitHubLink}
                                    className="github-link"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    Code <FontAwesomeIcon icon={faGithub} />
                                </a>
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
                        <div className="lighthouse-score">
                            <img src={dataModalProject.lightHouseSrc} alt="Score Lighthouse" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalProject;