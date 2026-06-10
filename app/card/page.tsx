"use client";

import { useState } from "react";

import CardItem from "./CardItem/CardItem";
import CardHero from "./CardHero/CardHero";
import CardFooter from "./CardFooter/CardFooter";
import PhoneModal from "./PhoneModal/PhoneModal";

const cardItems = [
    {
        icon: "profile",
        href: "/",
        title: "Qui suis-je ?",
        description: "Mon parcours, mes projets \net ma vision.",
        isSpecial: true,
    },
    {
        icon: "email",
        href: "mailto:hello@charlesabj.com",
        title: "Email",
        description: "hello@charlesabj.com",
        isSpecial: false,
    },
    {
        icon: "phone",
        title: "Téléphone",
        description: "Appel ou WhatsApp",
        isSpecial: false,
        isPhone: true,
    },
    {
        icon: "linkedin",
        href: "https://www.linkedin.com/in/charles-abj/",
        title: "LinkedIn",
        description: "Profil professionnel",
        isSpecial: false,
    },
    {
        icon: "github",
        href: "https://github.com/charlesabj",
        title: "GitHub",
        description: "Projets & code",
        isSpecial: false,
    },
    {
        icon: "calendar",
        href: "https://cal.eu/charles-abj/discutons-projet",
        title: "Prendre RDV",
        description: "Discutons de votre projet",
        isSpecial: false,
    },
] as const;

export default function Card() {
    const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

    return (
        <main className="Card">
            <CardHero />

            <section className="card-zone">
                <ul>
                    {cardItems.map((item) => (
                        <CardItem
                            key={item.title}
                            icon={item.icon}
                            href={"href" in item ? item.href : undefined}
                            title={item.title}
                            description={item.description}
                            isSpecial={item.isSpecial}
                            onClick={
                                "isPhone" in item && item.isPhone
                                    ? () => setIsPhoneModalOpen(true)
                                    : undefined
                            }
                        />
                    ))}
                </ul>
            </section>

            <CardFooter />

            <PhoneModal
                isOpen={isPhoneModalOpen}
                onClose={() => setIsPhoneModalOpen(false)}
            />
        </main>
    );
}