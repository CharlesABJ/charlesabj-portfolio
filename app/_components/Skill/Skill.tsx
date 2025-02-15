"use client";
import Image from 'next/image';
import React, { useState } from 'react';

interface PropsDataSkills {
    dataSkills: {
        className: string;
        title: string;
        subtitle: string;
        src: string;
        showDetailsDefault: boolean;
    };
}

function Skill({ dataSkills }: PropsDataSkills) {
    const [showDetails, setShowDetails] = useState(dataSkills.showDetailsDefault ? "showDetails" : "");

    const handleShowDetails = () => {
        if (showDetails === "showDetails") {
            setShowDetails("");
        }
        else {
            setShowDetails("showDetails");
        }
    };

    return (
        <li onClick={handleShowDetails} className={`Skill ${dataSkills.className} ${showDetails}`}>
            <Image src={dataSkills.src} alt={dataSkills.title} width={55} height={55} />
            <span className='title'>{dataSkills.title}</span>
            <div className="subtitle">{dataSkills.subtitle}</div>
        </li>
    );
}

export default Skill;