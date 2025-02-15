"use client";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToolbox } from '@fortawesome/free-solid-svg-icons';

// Importation des datas des outils de programmation
import datas from "../../../datas/toolsList.json";

// Importation des composants
import Skill from '../Skill/Skill';

function ToolsZone() {

    return (
        <div className="ToolsZone">
            <h3>
                <FontAwesomeIcon icon={faToolbox} />
                {/* Mes outils */}
                Outils & Environnements
            </h3>
            <ul className="tools">
                {datas.map((e) => (
                    <Skill

                        key={e.tool_id}
                        dataSkills={{
                            className: e.title,
                            title: e.title,
                            subtitle: e.subtitle,
                            src: e.src,
                            showDetailsDefault: false
                        }} />
                ))}
            </ul>
        </div>
    );
}

export default ToolsZone;