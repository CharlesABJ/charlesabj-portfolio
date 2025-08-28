"use client";
import { useEffect, useState } from 'react';
import SnakeCanvas from '../_components/Canvas/SnakeCanvas';
import datasTools from "../datas/toolsList.json";
import datasLanguages from "../datas/devLanguagesList.json";
import { usePathname } from 'next/navigation';

function NotFound404() {
    const [buttonIsNo, setButtonIsNo] = useState(false);
    const [buttonIsYes, setButtonIsYes] = useState(false);
    const [startGame, setStartGame] = useState(false);
    const [isCompagnyLoved, setIsCompagnyLoved] = useState("");
    const nbOfSkillsToolsAndLanguages: number = datasTools.length + datasLanguages.length;
    const url = usePathname().slice(1);


    const companies: Record<string, string> = {
        coteries: "https://www.coteries.com/",
        imedia: "https://www.imedia.ch/",
    };

    const linkOfCompagnyLoved = companies[url] || "";

    const redirection = () => {
        localStorage.removeItem('Mode secret 404');
        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
    };

    const handleNo = () => {
        setButtonIsNo(true);
        redirection();
    }
    const handleYes = () => {
        setButtonIsYes(true);
        localStorage.setItem('Mode secret 404', 'autorisé');
    }
    const handleStartGame = () => {
        setStartGame(true);
    }




    return (
        <main className="not-found page404">
            <div className={`container ${buttonIsYes ? "secret-mode-active" : ""}`}>
                <h1>Oups... <br className='displayed-for-tablet' /> La page que vous cherchez <span>n'existe pas !</span>
                    <span className="element404">404</span>
                </h1>
                <p className='troll'>Quelle idée de taper <span>« {`${url}`} »</span> dans la barre de recherche<i>🤦🏾‍♂️</i> <br />
                    {linkOfCompagnyLoved ? (
                        <>
                            Mais bon, je sais que c'est <a href={linkOfCompagnyLoved}><span>vous...</span></a> donc je vous pardonne pour cette fois ! <br /><br />
                            Allez, puisque vous êtes là, autant en profiter, non ?
                        </>
                    ) : (
                        "Mais bon, maintenant que vous êtes là autant en profiter non ?"
                    )}</p>
                <div className="buttons-zone">
                    <button onClick={handleYes} className="yes">Oui en profiter !</button>
                    <button onClick={handleNo} className="no">
                        <i className='i-one'>😠</i>
                        <i className='i-two'>😠</i>
                        <i className='i-three'>😠</i>
                        <i className='i-four'>😠</i>
                        <i className='i-five'>😠</i>
                        Non merci
                    </button>
                </div>

                {buttonIsNo && <p className='redirect'>Redirection en cours...<i>😠</i></p>}
            </div>

            {buttonIsYes &&
                <div className="secret-zone">
                    <div className={`container secret-mode ${startGame ? "hidden" : ""}`}>
                        <h2>Mode secret activé !</h2>
                        <div className="troll-content">
                            <p>Bravo, vous avez débloqué l'accès à la page d'accueil, mais pas si vite...</p>
                            <p>Obtenez <strong>{nbOfSkillsToolsAndLanguages} points</strong> dans ce défi <strong>épique</strong>, et vous pourrez enfin vous échapper !</p>
                            <p>Échouez, et vous serez condamné(e) à rester ici... <strong>forever</strong>... 🫣</p>
                        </div>
                        <div className="buttons-zone ">
                            <button onClick={handleStartGame} className="yes">Accepter</button>
                            <button onClick={handleNo} className="no">Quitter <br /> <span>(comme un looser)</span></button>
                        </div>
                        {buttonIsNo && <p className='redirect'>Redirection en cours...<i>😠</i></p>}

                    </div>

                    <div className={`container game ${startGame ? "visible" : ""}`}>
                        <SnakeCanvas dataSnakeCanvas={{ scoreToWin: nbOfSkillsToolsAndLanguages }} />
                    </div>


                </div>
            }

        </main>
    );
}

export default NotFound404;