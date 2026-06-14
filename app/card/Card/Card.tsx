"use client";

import { useState } from "react";
import CardHero from "../CardHero/CardHero";
import CardItem from "../CardItem/CardItem";
import CardFooter from "../CardFooter/CardFooter";
import PhoneModal from "../PhoneModal/PhoneModal";
import type { CardIcon } from "../CardItem/CardItem";
import type { CardProfile } from "@/datas/cardProfiles";

type CardProps = {
    profile: CardProfile;
    isCompanyCard?: boolean;
};

export default function Card({ profile, isCompanyCard = false }: CardProps) {
    const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

    const cardItems = [
        !isCompanyCard && profile.portfolioUrl
            ? {
                icon: "profile",
                avatar: profile.avatar,
                href: profile.portfolioUrl,
                title: "Qui suis-je ?",
                description: "Mon parcours, mes projets \net ma vision.",
                isSpecial: true,
            }
            : {
                icon: "profile",
                href: profile.portfolioUrl,
                title: "Qui sommes-nous ?",
                description: "Le studio, nos services \net nos réalisations",
                isSpecial: true,
            },
        {
            icon: "email",
            href: `mailto:${profile.email}`,
            title: "Email",
            description: profile.email,
            isSpecial: false,
        },
        {
            icon: "phone",
            title: "Téléphone",
            description: profile.phoneLabel,
            isSpecial: false,
            isPhone: true,
        },
        {
            icon: "linkedin",
            href: profile.linkedin,
            title: "LinkedIn",
            description: isCompanyCard ? "Suivez notre actualité" : "Profil professionnel",
            isSpecial: false,
        },
        profile.calendarUrl
            ? {
                icon: "calendar",
                href: profile.calendarUrl,
                title: "Prendre RDV",
                description: "Discutons de votre projet",
                isSpecial: false,
            }
            : null
    ].filter(Boolean);

    return (
        <main className="Card">
            <CardHero name={profile.name} role={profile.role} />

            <section className="card-zone">
                <ul>
                    {cardItems.map((item) => (
                        item && (
                            <CardItem
                                key={item.title}
                                icon={item.icon as CardIcon}
                                avatar={"avatar" in item ? item.avatar : undefined} href={"href" in item ? item.href : undefined}
                                title={item.title}
                                description={item.description}
                                isSpecial={item.isSpecial}
                                onClick={
                                    "isPhone" in item && item.isPhone
                                        ? () => setIsPhoneModalOpen(true)
                                        : undefined
                                }
                            />
                        )
                    ))}
                </ul>
            </section>

            <CardFooter />
            <PhoneModal
                isOpen={isPhoneModalOpen}
                onClose={() => setIsPhoneModalOpen(false)}
                phones={profile.phones}
            />
        </main>
    );
}