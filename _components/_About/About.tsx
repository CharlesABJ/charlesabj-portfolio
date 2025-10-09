"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
interface AboutProps {
    dataAbout: {
        illustrationSrc: string;
        illustrationSrc2: string;
    };
}
function About({ dataAbout }: AboutProps) {
    /**
     * Fonction qui gère le survol de l'image
     */
    /**/
    const [hover, setHover] = useState(false);
    const handleHover = () => {
        setHover(!hover);
    };

    /** Fonction qui calcule l'âge en fonction de la date de naissance
    * @param {number} Y Année de naissance
    * @param {number} M Mois de naissance
    * @param {number} D Jour de naissance
    */
    const calculateAge = (Y: number, M: number, D: number) => {
        const nbOfSecondsInAYear = 31536000; // Nombre de secondes dans une année
        const nbOfMillisecondsInAYear = nbOfSecondsInAYear * 1000; // On multiplie par 1000 pour obtenir le nombre de millisecondes
        const today = new Date(); // On obtient la date actuelle
        const birthDate = new Date(Y, M - 1, D); // On obtient la date de naissance
        let age = (today.getTime() - birthDate.getTime()) / nbOfMillisecondsInAYear;  // On soustrait la date de naissance à la date actuelle et on divise par le nombre de millisecondes dans une année (getTime() permet de convertir les dates en milliseconde
        age = Math.floor(age); // On arrondit à l'entier inférieur
        return age;
    };

    /**
     * Fonction qui gère le survol de l'image
     */
    const [seeMore, setSeeMore] = useState("Voir plus");
    const handleSeeMore = () => {
        if (seeMore === "Voir plus") {
            setSeeMore("Voir moins");
        } else {
            setSeeMore("Voir plus");
        }
    }

    const [grettings, setGrettings] = useState("Bonjour");

    useEffect(() => {

        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        if (currentHour < 18) {
            setGrettings("Bonjour");
        } else {
            setGrettings("Bonsoir");
        }


    }, [])

    return (
        <section id="about" className="About">
            <div className="container">
                <h2>À Propos de moi</h2>
                <p>Qui suis-je exactement ?</p>
                <div className="illustration-and-presentation">
                    <div className="illustration">
                        <Image onMouseEnter={handleHover} onMouseLeave={handleHover} src={hover ? dataAbout.illustrationSrc2 : dataAbout.illustrationSrc} alt="Charles ABJ" width={685} height={404} />
                    </div>
                    <div className="presentation">
                        <h3>Un Développeur Front-End</h3>
                        <p>
                            {grettings} à vous qui lisez ces lignes !
                            <br />
                            Je m'appelle <span><strong>Charles ABJ,</strong></span> j'ai
                            <span
                                className="age"
                                title="le 3 novembre 2000😁🎂">
                                <strong>{` ${calculateAge(2000, 11, 3)} ans `}</strong>
                            </span>
                            et je suis Développeur <span title="et WordPress aussi :P "><strong>Front-End.</strong></span>
                        </p>
                        <div>
                            <p>
                                <br />
                                Aussi loin que je m'en souvienne, j'ai toujours été attiré par la
                                création.<br />
                                Que ce soit par l'écriture de scénario, la
                                conception de jeu de rôle ou encore la programmation.
                            </p>
                            <p className="share-with-world">
                                Vous l'aurez compris : j'aime créer. <br />
                                Mais ce qui me fascine particulièrement dans la programmation,
                                c'est la capacité à transformer une idée en expérience concrète, et de pouvoir la <span>
                                    <strong>partager avec le reste du monde !</strong>
                                </span>
                            </p>
                        </div>
                        <details>
                            <summary onClick={handleSeeMore}>{seeMore}</summary>
                            <div>
                                Je suis actuellement <span>à la recherche d’une opportunité </span>(stage ou poste) en tant que <span><strong>Développeur Web.</strong></span>
                            </div>
                            <p>
                                J’aime raconter des histoires à travers le code, créer des expériences immersives <br /> et donner vie aux idées. <br /> <br />
                                Si vous cherchez un profil à la fois créatif et technique, <Link href="/#contact"><span>contactez-moi !</span></Link>
                            </p>

                        </details>
                    </div>
                </div >
            </div>
        </section >
    );
}

export default About;
