import React from 'react';

// Importation des datas des langages de programmation
import datas from "../../../datas/devLanguagesList.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import Skill from '../Skill/Skill';
function DevLanguagesZone() {
    return (
        <div className="DevLanguagesZone">
            <h3>
                <FontAwesomeIcon icon={faCode} />
                {/* Mes langages */}
                Langages & Frameworks
            </h3>
            <ul className="dev-languages">
                {datas.slice(0, 5).map((e, index) => (
                    <Skill key={e.devLanguage_id} dataSkills={{ className: "dev-language", showDetailsDefault: index === 0 ? true : false, title: e.title, subtitle: e.subtitle, src: e.src }} />

                ))}
            </ul>

        </div>
    );
}

export default DevLanguagesZone;