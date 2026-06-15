"use client";

import React, { useEffect, useState } from "react";

function Logo() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);
    const [isHackMode, setIsHackMode] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    const symbols = [
        ["<", ">"],
        ["{", "}"],
        ["(", ")"],
        ["$", "$"],
        ["#", "#"],
        ["@", "@"],
        ["%", "%"],
        ["*", "*"],
        ["/", "\\"],
    ];

    const [symbolIndex, setSymbolIndex] = useState(0);

    const handleClick = () => {
        if (isPlaying || isHackMode) return;
        setClickCount((prev) => {
            const next = prev + 1;

            setHasPlayed(false);

            if (next % 3 === 0) {
                setIsHackMode(true);
            } else {
                requestAnimationFrame(() => {
                    setIsPlaying(true);
                });
            }

            return next;
        });
    };

    useEffect(() => {
        setIsPlaying(true);
    }, []);

    useEffect(() => {
        if (!isPlaying) return;

        const timer = setTimeout(() => {
            setIsPlaying(false);
            setHasPlayed(true);
        }, 1700);

        return () => clearTimeout(timer);
    }, [isPlaying]);

    useEffect(() => {
        if (!isHackMode) {
            setSymbolIndex(0);
            return;
        }

        const interval = setInterval(() => {
            setSymbolIndex((prev) => (prev + 1) % symbols.length);
        }, 120);

        const timer = setTimeout(() => {
            setIsHackMode(false);
            setHasPlayed(true);
        }, 1000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [isHackMode]);

    return (
        <div
            onClick={handleClick}
            className={`Logo ${isPlaying ? "is-playing" : ""
                } ${hasPlayed ? "has-played" : ""} ${isHackMode ? "is-hack-mode" : ""
                }`}
        >
            <span className="brk brk-left">
                {symbols[symbolIndex][0]}
            </span>

            <svg
                width="263"
                height="151"
                viewBox="0 0 263 151"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
                {symbols[symbolIndex][1]}
            </span>
        </div>
    );
}

export default Logo;