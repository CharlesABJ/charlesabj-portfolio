"use client";
import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import devLanguages from '../../datas/devLanguagesList.json';

interface SnakeCanvasProps {
    dataSnakeCanvas: {
        scoreToWin: number;
    };
}

const CELL_SIZE = 30;
const CANVAS_WIDTH = CELL_SIZE * 17;
const CANVAS_HEIGHT = CELL_SIZE * 15;


type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number }


function SnakeCanvas({ dataSnakeCanvas }: SnakeCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
    const [food, setFood] = useState<Position>({ x: 4, y: 4 });
    const [foodImage, setFoodImage] = useState<HTMLImageElement | null>(null);
    const [direction, setDirection] = useState<Direction | null>(null);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [score, setScore] = useState(0);

    const router = useRouter();


    const messages = {
        win: [
            "Bravo ! Vous avez maîtrisé tous mes outils et langages ! Et si on en discutait ?",
            "Incroyable ! Vous êtes vraiment le/la goat que vous pensez être ! 🐐🔥 Envoyez-moi un message !",
            "Félicitations ! Vous êtes plutôt doué(e) je l'avoue... Bon, je veux bien qu'on discute !",
            "Vous êtes génial(e) ! Contactez-moi, on pourrait travailler ensemble ! 🎉💻",
            "Je reconnais un talent quand j’en vois un ! Vous devriez me contacter",
            "Mmhhh vous êtes plutôt fort(e) comme être humain... Et si on en discutait ? 🤔",
            "Bravo ! Vous êtes doué(e)... mais le vrai challenge, c’est de me contacter ! 💪"
        ],
        loose: [
            "Aïe, aïe, aïe... On recommence ? 😬",
            "Parfois, il faut savoir perdre pour mieux gagner...",
            "Dommage... Vous étiez si proche ! On ne lâche pas !",
            "Seuls les meilleurs savent rebondir après une défaite... Allez, on y retourne ?",
            "Perdre, c’est le début de la victoire... ou quelque chose comme ça. On retente ?",
            "De toute façon « gagner », c’est pas un peu du déjà vu ? Allez, on recommence !",
            "Si vous vouliez passer du temps avec moi, il vous suffisait simplement de me contacter ! 🫣"
        ]
    };

    const redirectionWinSentence = "Redirection vers la page d’accueil dans 3… 2… 1… 🚀 ";


    // On charge une nouvelle image de nourriture
    const loadNewFoodImage = () => {
        const img = new Image();
        const randomLanguage = devLanguages[Math.floor(Math.random() * devLanguages.length)];
        img.src = randomLanguage.src;
        img.onload = () => {
            setFoodImage(img);
        };
    };
    useEffect(() => {


        loadNewFoodImage();

    }, []); // On recharge l'image de la nourriture à chaque fois que la nourriture change

    // Gestion des évenenements au clic sur les flèches
    const handleArrowClick = (direction: Direction) => {
        if (gameOver) return;

        if (!gameStarted) {
            setGameStarted(true);
        }

        switch (direction) {
            case 'UP': setDirection(prev => prev !== 'DOWN' ? 'UP' : prev); break;
            case 'DOWN': setDirection(prev => prev !== 'UP' ? 'DOWN' : prev); break;
            case 'LEFT': setDirection(prev => prev !== 'RIGHT' ? 'LEFT' : prev); break;
            case 'RIGHT': setDirection(prev => prev !== 'LEFT' ? 'RIGHT' : prev); break;
        }
    }

    // Gestion des événements clavier
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (gameOver) return;

            if (!gameStarted) {
                if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                    setGameStarted(true);
                }
            }

            switch (e.key) {
                case 'ArrowUp': setDirection(prev => prev !== 'DOWN' ? 'UP' : prev); break;
                case 'ArrowDown': setDirection(prev => prev !== 'UP' ? 'DOWN' : prev); break;
                case 'ArrowLeft': setDirection(prev => prev !== 'RIGHT' ? 'LEFT' : prev); break;
                case 'ArrowRight': setDirection(prev => prev !== 'LEFT' ? 'RIGHT' : prev); break;
            }

        };
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [gameStarted, gameOver]);

    // Gestion du mouvement du serpent
    useEffect(() => {
        if (gameOver || !gameStarted || !direction) return;

        const moveSnake = () => {
            const newSnake = [...snake];
            const headOfSnake = { ...newSnake[0] };

            switch (direction) {
                case 'UP':
                    headOfSnake.y--;
                    break;
                case 'DOWN':
                    headOfSnake.y++;
                    break;
                case 'LEFT':
                    headOfSnake.x--;
                    break;
                case 'RIGHT':
                    headOfSnake.x++;
                    break;
            }

            if (headOfSnake.x < 0 || headOfSnake.x >= CANVAS_WIDTH / CELL_SIZE ||
                headOfSnake.y < 0 || headOfSnake.y >= CANVAS_HEIGHT / CELL_SIZE) {
                setGameOver(true);
                return;
            }


            if (newSnake.some(snakeBodyPart => snakeBodyPart.x === headOfSnake.x && snakeBodyPart.y === headOfSnake.y)) {
                setGameOver(true)
                return
            }


            newSnake.unshift(headOfSnake);

            if (headOfSnake.x === food.x && headOfSnake.y === food.y) {
                loadNewFoodImage();
                setFood(getRandomPosition());
                setScore(prev => prev + 1);
            } else {
                newSnake.pop();
            }

            setSnake(newSnake);
        };

        const gameLoop = setInterval(moveSnake, 100);
        return () => clearInterval(gameLoop);
    }, [snake, direction, food, gameOver, gameStarted]);



    // On dessine nos éléments
    useEffect(() => {

        // Dessin du canvas
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx) return;

        // On efface le canvas pour éviter les superpositions 
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // On dessine le serpent
        ctx.strokeStyle = '#36421e';
        ctx.lineWidth = 1;

        snake.forEach(({ x, y }, index) => {
            if (index === 0) {
                ctx.fillStyle = "green"
            }
            else {
                ctx.fillStyle = 'transparent';
            }
            ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE); // Remplit le rectangle 
            ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE); // Trace les bords

        });

        if (foodImage) {
            ctx.drawImage(
                foodImage,
                food.x * CELL_SIZE,
                food.y * CELL_SIZE,
                CELL_SIZE,
                CELL_SIZE
            );
        }



    }, [snake, foodImage]);

    const getRandomPosition = (): Position => ({
        x: Math.floor(Math.random() * (CANVAS_WIDTH / CELL_SIZE)),
        y: Math.floor(Math.random() * (CANVAS_HEIGHT / CELL_SIZE))
    });

    const restartGame = () => {
        setSnake([{ x: 10, y: 10 }])
        setFood(getRandomPosition())
        setDirection('RIGHT')
        setGameOver(false)
        setGameStarted(false)
        setScore(0)
        setDirection(null)
    }



    const homeRedirectionAfterLoose = () => {

        router.push('/');
    }

    const homeRedirectionAfterWin = () => {
        router.push('/#contact');
    };

    if (score >= dataSnakeCanvas.scoreToWin && gameOver) {
        setTimeout(() => {
            homeRedirectionAfterWin()
        }, 4500);
    }

    return (
        <div className="Canvas game-container">
            {!gameStarted && !gameOver && (
                <div className="instruction">
                    Appuyez sur une flèche (← ↑ → ↓) pour démarrer !
                </div>
            )}
            {gameStarted && !gameOver && (
                <div className="score">
                    <div className="number">
                        <div className={score >=
                            dataSnakeCanvas.scoreToWin ? "current-value win" : "current-value"
                        }>{score}</div>/{dataSnakeCanvas.scoreToWin}
                    </div>
                    Votre score
                </div>)
            }

            {gameOver && <div className="overlay"></div>}
            <canvas width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT} className="SnakeCanvas" ref={canvasRef} />

            <div className="responsive-arrows">
                <span onClick={() => handleArrowClick("UP")} className="arrow arrow-up">↑</span>
                <span onClick={() => handleArrowClick("DOWN")} className="arrow arrow-down">↓</span>
                <span onClick={() => handleArrowClick("LEFT")} className="arrow arrow-left">←</span>
                <span onClick={() => handleArrowClick("RIGHT")} className="arrow arrow-right">→</span>
            </div>
            {gameOver && (
                <div className="modal-game-result">
                    {score >= dataSnakeCanvas.scoreToWin ? (
                        <>
                            <p className="message win">
                                {messages.win[Math.floor(Math.random() * messages.win.length)]}
                            </p>
                            <p onClick={homeRedirectionAfterLoose}
                                className="redirection">{redirectionWinSentence}</p>
                        </>
                    ) : (
                        <>
                            <p className="message loose">
                                {messages.loose[Math.floor(Math.random() * messages.loose.length)]}
                            </p>
                            <div className="buttons-zone">
                                <button onClick={restartGame} className="restart">Recommencer</button>
                                <button onClick={homeRedirectionAfterLoose} className="left">
                                    Fuir impunément
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default SnakeCanvas;