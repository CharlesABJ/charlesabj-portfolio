"use client";
import { useEffect, useState } from "react";
const ANIMATION_DURATION = 1700;
const HACK_DURATION = 1000;
const SYMBOL_INTERVAL = 120;
const HACK_TRIGGER_INTERVAL = 4;
const SYMBOLS = [
    ["<", ">"],
    ["{", "}"],
    ["(", ")"],
    ["$", "$"],
    ["#", "#"],
    ["@", "@"],
    ["%", "%"],
    ["*", "*"],
    ["/", "\\"],
] as const;
function Logo() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);
    const [isHackMode, setIsHackMode] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [symbolIndex, setSymbolIndex] = useState(0);
    const isLocked = isPlaying || isHackMode;
    const logoClasses = [
        "Logo",
        isPlaying && "is-playing",
        hasPlayed && "has-played",
        isHackMode && "is-hack-mode",
    ]
        .filter(Boolean)
        .join(" ");
    const handleClick = () => {
        if (isLocked) return;
        setClickCount((previousCount) => {
            const nextCount = previousCount + 1;
            setHasPlayed(false);
            if (nextCount % HACK_TRIGGER_INTERVAL === 0) {
                setIsHackMode(true);
            } else {
                requestAnimationFrame(() => {
                    setIsPlaying(true);
                });
            }
            return nextCount;
        });
    };
    // Lance l’animation automatiquement au chargement.
    useEffect(() => {
        setIsPlaying(true);
    }, []);
    // Gère la fin de l’animation principale.
    useEffect(() => {
        if (!isPlaying) return;
        const timer = window.setTimeout(() => {
            setIsPlaying(false);
            setHasPlayed(true);
        }, ANIMATION_DURATION);
        return () => window.clearTimeout(timer);
    }, [isPlaying]);
    // Gère le mode hack : défilement des symboles + retour à l’état final.
    useEffect(() => {
        if (!isHackMode) {
            setSymbolIndex(0);
            return;
        }
        const interval = window.setInterval(() => {
            setSymbolIndex((previousIndex) => (
                previousIndex + 1
            ) % SYMBOLS.length);
        }, SYMBOL_INTERVAL);
        const timer = window.setTimeout(() => {
            setIsHackMode(false);
            setHasPlayed(true);
        }, HACK_DURATION);
        return () => {
            window.clearInterval(interval);
            window.clearTimeout(timer);
        };
    }, [isHackMode]);
    return (
        <div onClick={handleClick} className={logoClasses}>
            <span className="brk brk-left">
                {SYMBOLS[symbolIndex][0]}
            </span>
            <svg
                width="263"
                height="151"
                viewBox="0 0 263 151"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <path
                    className="left-bracket"
                    d="M31.5226 15.0117H1.5V135.102H31.5226"
                    stroke="#C0A37E"
                    strokeWidth="3"
                />
                <circle
                    className="main-circle"
                    cx="130.597"
                    cy="75.0565"
                    r="73.5565"
                    stroke="#C0A37E"
                    strokeWidth="3"
                />
                <path
                    className="right-bracket"
                    d="M231.066 135.272L261.087 134.923L259.693 14.841L229.672 15.1895"
                    stroke="#C0A37E"
                    strokeWidth="3"
                />
                <circle
                    className="center-dot"
                    cx="130.598"
                    cy="75.0577"
                    r="4.50377"
                    fill="#C0A37E"
                    stroke="#C0A37E"
                />
            </svg>
            <span className="brk brk-right">
                {SYMBOLS[symbolIndex][1]}
            </span>
        </div>
    );
}
export default Logo;