import React from 'react';
import Image from 'next/image';

function CardHero() {
    return (
        <div className="CardHero">
            <div className="logo">
                <Image src="/images/logos/logo-abj.svg" alt="Logo Charles ABJ" width={50} height={50} />
            </div>
            <div>
                <h1>Charles <span>ABJ</span></h1>
                <hr />
                <p className="function">Développement web & mobile</p>
            </div>
            <div className='slogan'>
                Des <span>expériences</span> numériques simples,<br /> utiles et <span>humaines</span>.
            </div>
            <div className="features">
                Sites internet • Applications web & mobiles <br /> SEO / Référencement • UX/UI Design
            </div>

        </div>
    );
}

export default CardHero;
