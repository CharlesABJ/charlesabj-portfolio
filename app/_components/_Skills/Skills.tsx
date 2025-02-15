import React from 'react';
import DevLanguagesZone from '../DevLanguagesZone/DevLanguagesZone';
import ToolsZone from '../ToolsZone/ToolsZone';

function Skills() {
    return (
        <section id='skills' className="Skills">
            <div className="container">
                <h2>Mes Compétences</h2>
                <p>Mes principales compétences</p>
                <div className="devLanguages-and-tools">
                    <DevLanguagesZone />
                    <ToolsZone />
                </div>
            </div>
        </section>
    );
}

export default Skills;