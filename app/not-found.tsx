"use client";
import { useEffect, useState } from 'react';
import SnakeCanvas from '../_components/Canvas/SnakeCanvas';
import datasTools from "../datas/toolsList.json";
import datasLanguages from "../datas/devLanguagesList.json";
import { usePathname } from 'next/navigation';
import Link from 'next/link';


function NotFound404() {
    const [buttonIsNo, setButtonIsNo] = useState(false);
    const [buttonIsYes, setButtonIsYes] = useState(false);
    const [startGame, setStartGame] = useState(false);
    const nbOfSkillsToolsAndLanguages: number = datasTools.length + datasLanguages.length;
    const url = usePathname().slice(1);

    interface CompanyMeta {
        name: string;
        link: string;
        color: string;
        message?: string;
    }

    const companies: Record<string, CompanyMeta> = {
        coteries: {
            name: "Coteries",
            link: "https://www.coteries.com/agence#section-team",
            color: "#FEF380",
        },
        imedia: {
            name: "iMedia",
            link: "https://www.imedia.ch/agence#teamMate0",
            color: "#5005CD",
            message: "Je pense qu’ensemble on pourra aller encore plus vite."
        },
        troisdeuxun: {
            name: "TroiDeuxUn",
            link: "https://www.troisdeuxun.ch/agence/",
            color: "#FFD94A",
            message: "On compte jusqu’à trois et on y va",
        },
        wng: {
            name: "WNG",
            link: "https://www.wng.ch/agence",
            color: "#E9004C",
        },
        marvelous: {
            name: "Marvelous",
            link: "https://marvelous.digital/fr/l-agence#:~:text=de%20nouveaux%20d%C3%A9fis.-,L%27%C3%A9quipe,-Mathieu%20Croset",
            color: "#FFAB05",
        },
        trisinformatique: {
            name: "Tris Informatique",
            link: "https://www.trisinformatique.com/entreprise/philosophie/",
            color: "#1C4998",
        },
        diabolo: {
            name: "Diabolo",
            link: "https://www.diabolo.com/agence/#:~:text=et%20bien%20d%E2%80%99autres.-,L%E2%80%99%C3%A9quipe%0ADiabolo,-Lumi%C3%A8re%20sur%20les",
            color: "#FF3801",
        },
        buxumlunic: {
            name: "Buxum Lunic",
            link: "https://buxumlunic.ch/agence",
            color: "#C2C5E1",
        },
        antistatique: {
            name: "Antistatique",
            link: "https://antistatique.net/agence#:~:text=Lisez%20notre%20manifeste-,Notre%20%C3%A9quipe,-Tous%C2%B7tes",
            color: "#FF0099",
            message: "Rester statique..? Très peu pour nous 🚀"
        },
        flashdesign: {
            name: "Flash Design",
            link: "https://flashdesign.ch/nos-experts/",
            color: "#F00201",
        },
        sabina: {
            name: "Sabina",
            link: "https://sabina.ch/a-propos/",
            color: "#2B2C2F",
        },
        "taz-communication": {
            name: "Taz Communication",
            link: "https://taz-communication.ch/agence#brxe-nnlpnm",
            color: "#009AF7",

        },
        trio: {
            name: "Trio",
            link: "https://trio.ch/team",
            color: "#C31721",
            message: "On compte jusqu’à trois et on y va",
        },
        trivialmass: {
            name: "Trivial Mass",
            link: "https://trivialmass.ch/nous-sommes#block-block_d4f9a7a89325556efc061b77037c94a4",
            color: "#CBFF00",
        },
        generalmedia: {
            name: "General Media",
            link: "https://www.generalmedia.ch/fr/societe/lequipe",
            color: "#B70137",
        },
        mediago: {
            name: "Media Go",
            link: "https://mediago.ch/equipe/",
            color: "#F74242",
        },
        firstpoint: {
            name: "First Point",
            link: "https://www.firstpoint.ch/agence-digitale-lausanne#:~:text=Des%20collaborateurs%20passionn%C3%A9s%20et%20engag%C3%A9s",
            color: "#ED7A26",
            message: "On commence par le point un, et on verra où ça mène."
        },
        pomzed: {
            name: "Pomzed",
            link: "https://pomzed.ch/",
            color: "#D41527",
            message: "Promis, on pourra parler de pommes 🍏 toute la journée (non)."
        }
    };

    const company = companies[url];
    const companyLink = company?.link || null;

    useEffect(() => {
        if (!company) return;

        const defaultMessage = "Oui, je sais que vous avez cliqué par curiosité professionnelle !";
        const consoleMessage = company.message
            ? `%c${company.message}`
            : `%c${defaultMessage}`
            ;

        console.clear();
        console.log(
            consoleMessage,
            `color:${company.color}; font-weight:600;  font-size:12px;`
        );
    }, [company]);


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
                    {companyLink ? (
                        <>
                            Mais bon, comme c'est <Link target="_blank" href={companyLink}><span>vous...</span></Link> je ferme les yeux pour cette fois ! <br /><br />
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