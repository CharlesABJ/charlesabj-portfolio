import { useEffect, useState } from 'react';

function useMachineWritter(words: string[]) {
    const [wordIndex, setWordIndex] = useState(0);
    const [letterIndex, setLetterIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [displayedText, setDisplayedText] = useState('Front-End');
    const [pause, setPause] = useState(false);

    useEffect(() => {
        if (pause) return;
        const wordsLength = words.length;
        const currentWord = words[wordIndex];
        const speedOfTyping = isDeleting ? 50 : 150;
        const timeOfPause = wordsLength === wordIndex + 1 ? 6000 : 2000;
        if (wordsLength < 2) return;
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                const lettersDisplayed = currentWord.slice(0, letterIndex + 1);
                setDisplayedText(lettersDisplayed);
                setLetterIndex((prev) => prev + 1);

                if (lettersDisplayed === currentWord) {
                    // Une fois le mot terminé, on met pause
                    setPause(true);
                    setTimeout(() => {
                        setIsDeleting(true);
                        setPause(false);
                    }, timeOfPause);
                }
            } else {
                const lettersDisplayed = currentWord.slice(0, letterIndex - 1);
                setDisplayedText(lettersDisplayed);
                setLetterIndex((prev) => prev - 1);

                if (lettersDisplayed === '') {
                    // Mot effacé : passer au suivant
                    setIsDeleting(false);
                    setWordIndex((prev) => (prev + 1) % words.length);
                    setLetterIndex(0);
                }
            }
        }, speedOfTyping);

        return () => clearTimeout(timeout);
    }, [letterIndex, isDeleting, wordIndex, words, pause]);

    return displayedText;
}

export default useMachineWritter;