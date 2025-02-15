"use client";
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import React, { useState } from 'react';


// Importation des  composants :
import TechnosZone from '../TechnosZone/TechnosZone';

interface HomeProps {
    dataHome: {
        avatarSrc: string;
    }
}

function Home({ dataHome }: HomeProps) {
    const [shake, setShake] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [titleHandIsActive, setTitleHandIsActive] = useState(false);
    const [wink, setWink] = useState(false);
    const router = useRouter();
    const handleShake = () => {
        setClickCount(clickCount + 1);

        if (clickCount >= 2 && clickCount <= 8) {
            setTitleHandIsActive(true);
            setTimeout(() => {
                setTitleHandIsActive(false);
            }, 3000)

        }
        if (clickCount > 8) {
            setTitleHandIsActive(true);

            setTimeout(() => {
                setTitleHandIsActive(false);
            }, 5000)
            router.push('/#contact');
        }

        setShake(true); // On active la classe pour le shake
        setWink(true); // On active la classe pour le clin d'oeil

        setTimeout(() => { // SetTimeOut permet de définir un temps avant de déclencher une action
            setShake(false); // L'action a déclencher
        }, 500); // 500 signifie 500 que setShake sera false à partir de 500ms

        setTimeout(() => {
            setWink(false);
        }, 1000);
    }

    return (
        <section id='home' className="Home">
            <div className="container">
                <div className="presentation-and-avatar">
                    <div className="presentation">
                        <h1>Développeur
                            <span className='specification'>Front-End &nbsp;&nbsp;&nbsp;&nbsp;
                                <span
                                    onClick={handleShake}
                                    title={clickCount < 10 ? "Salut !" : "Ça suffit !! \nContactez-moi 😠"}
                                    className={`hand ${shake ? 'shake' : ''} `}
                                    role="img"
                                    aria-label="hand">
                                    👋🏽

                                </span>
                                {titleHandIsActive && (
                                    <span className='hand-title'
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                clickCount >= 2 && clickCount <= 4
                                                    ? "Doucement ! <br /> C'est juste un clic !!"
                                                    : clickCount > 4 && clickCount <= 7
                                                        ? "..."
                                                        : "Ça suffit !! <br /> Contactez-moi 😠"
                                        }}
                                    />
                                )}
                            </span>
                        </h1>
                        <p className='description'>
                            Bienvenue sur ma page ! Je suis Charles ABJ. <br />
                            Passionné depuis toujours par la création, je suis un développeur constamment animé par le désir de concrétiser et partager des réalisations avec le monde !
                        </p>

                        <ul className="social-networks">
                            <li>
                                <a
                                    href="https://github.com/CharlesABJ"
                                    title="Github"
                                    rel="noopener noreferrer"
                                    target="_blank">
                                    <FontAwesomeIcon icon={faGithub} />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.linkedin.com/in/charlesabj-78753b182/"
                                    title="LinkedIn"
                                    rel="noopener noreferrer"
                                    target="_blank">
                                    <FontAwesomeIcon icon={faLinkedin} />
                                </a>
                            </li>
                            <li>
                                <a title="Messenger"
                                    href="https://m.me/100094215251917"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faFacebookMessenger} />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="avatar">
                        <span className={`loupe ${wink ? "hand-is-shaked" : ""}`}></span>
                        <Image src={dataHome.avatarSrc} width={550} height={550} alt="Charles ABJ avatar" priority />
                    </div>
                </div>
                <div className="technos">
                    <p className="title">Mes technos</p>
                    <TechnosZone />
                </div>
            </div>
        </section>
    );
}

export default Home;