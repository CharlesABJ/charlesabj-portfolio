"use client"
import React, { useEffect } from 'react';
const phoneIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M21 16.5V19C21 20.1 20.1 21 19 21C10.16 21 3 13.84 3 5C3 3.9 3.9 3 5 3H7.5C8.05 3 8.53 3.38 8.66 3.91L9.5 7.5C9.61 7.97 9.46 8.46 9.11 8.79L7.8 10.05C8.96 12.57 11.43 15.04 13.95 16.2L15.21 14.89C15.54 14.54 16.03 14.39 16.5 14.5L20.09 15.34C20.62 15.47 21 15.95 21 16.5Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M14 4C16.76 4.55 18.95 6.74 19.5 9.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
        />
        <path
            d="M14 7C15.1 7.3 15.7 7.9 16 9"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
        />
    </svg>
);

const whatsappIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M20 12C20 16.42 16.42 20 12 20C10.63 20 9.34 19.66 8.21 19.05L4.5 20L5.47 16.39C4.53 15.12 4 13.55 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12Z"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

type PhoneModalProps = {
    isOpen: boolean;
    onClose: () => void;
    phones: {
        fr?: {
            phone: string;
            whatsapp: string;
        };
        ch?: {
            phone: string;
            whatsapp: string;
        };

    };
};


function PhoneModal({ isOpen, onClose, phones }: PhoneModalProps) {

    useEffect(() => {
        if (!isOpen) return;

        const originalOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="PhoneModal">
            <div className="overlay" onClick={onClose} />
            <div className="modal">
                <div className="label-and-close">
                    <div className="label">Téléphone</div>
                    <button
                        className="close"
                        onClick={onClose}
                        aria-label="Fermer"
                    >
                        ✕
                    </button>

                </div>
                <div className="content">
                    <div className="modal-title">
                        Choisir un <span>numéro</span>
                    </div>
                    {phones.ch && (
                        <div className="country">
                            <div className="country-label">
                                <div className="flag">🇨🇭</div> Suisse

                            </div>
                            <div className="choices">
                                <a
                                    className="choice phone"
                                    href={`tel:${phones.ch.phone}`}
                                >
                                    <div className="icon">{phoneIcon}</div>
                                    Appeler
                                </a>

                                <a
                                    className="choice whatsapp"
                                    href={phones.ch.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div className="icon">{whatsappIcon}</div>
                                    WhatsApp
                                </a>
                            </div>

                        </div>

                    )}
                    {phones.ch && phones.fr && <hr />}
                    {phones.fr && (
                        <div className="country">
                            <div className="country-label">
                                <div className="flag">🇫🇷</div> France
                            </div>
                            <div className="choices">
                                <a
                                    className="choice phone"
                                    href={`tel:${phones.fr.phone}`}
                                >
                                    <div className="icon">{phoneIcon}</div>
                                    Appeler
                                </a>
                                <a
                                    className="choice whatsapp"
                                    href={phones.fr.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >

                                    <div className="icon">{whatsappIcon}</div>
                                    WhatsApp
                                </a>
                            </div>
                        </div>

                    )}

                </div>
            </div>
        </div>
    );
}

export default PhoneModal;