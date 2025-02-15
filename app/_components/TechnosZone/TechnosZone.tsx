import React from 'react';
import Image from 'next/image';

// import useFetch from '@/app/_hooks/useFetch';

// Importation des datas des technos
import datas from "../../../datas/technosList.json";


function TechnosZone() {
    return (
        <ul className="TechnosZone">

            {datas.slice(0, 6).map((e) => (
                <li className='techno' key={e.techno_id} title={e.title}>
                    <span className='seo-only'>{e.title}</span>
                    <Image src={e.src} alt={e.title} width={60} height={60} />
                </li>
            ))}
        </ul>
    );
}

export default TechnosZone;