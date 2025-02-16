import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from 'react';

interface PropsCardProject {
    dataCardProject: {
        title: string;
        year: number;
        coverSrc: string;
        pictures: string;
        lightHouseSrc: string;
        missionResume: string;
        mission: string;
        strongPoints: string[];
        technosUsed: string[];
        gitHubLink: string;
        websiteLink?: string;
        isProjectSelected?: boolean;
    };
    onModalOpen: (dataCardProject: any) => void;
}

function CardProject({ dataCardProject, onModalOpen }: PropsCardProject) {
    return (
        <li className={`CardProject ${dataCardProject.isProjectSelected ? "project-selected" : ""}`}>
            {dataCardProject.websiteLink ? (
                <a href={dataCardProject.websiteLink} target="_blank" className="cover">
                    <div className="overlay"></div>
                    <Image src={dataCardProject.coverSrc} width={580} height={400} alt={dataCardProject.title} />
                </a>
            ) : (
                <div className="cover">
                    <div className="overlay"></div>
                    <Image src={dataCardProject.coverSrc} width={580} height={400} alt={dataCardProject.title} />
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