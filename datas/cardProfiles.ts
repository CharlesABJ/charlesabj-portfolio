
export type PhoneData = {
    phone: string;
    whatsapp: string;

};
export type CardProfile = {
    slug: string;
    name: string;
    role: string;
    avatar?: string;
    portfolioUrl?: string;
    email: string;
    phoneLabel: string;
    phones: {
        fr?: PhoneData;
        ch?: PhoneData;

    };
    linkedin?: string;
    calendarUrl?: string;
};

export const cardProfiles: CardProfile[] = [
    {
        slug: "central-abj",
        name: "Central ABJ",
        role: "Studio numérique",
        portfolioUrl: "https://centralabj.com",
        email: "hello@centralabj.com",
        phoneLabel: "Appel ou WhatsApp",
        phones: {
            fr: {
                phone: "+33612345678",
                whatsapp: "https://wa.me/33612345678",
            },
            ch: {
                phone: "+41763694154",
                whatsapp: "https://wa.me/41763694154",
            },
        },
        linkedin: "https://www.linkedin.com/in/charlesabj-78753b182/",
        calendarUrl: "https://cal.eu/central-abj/discutons-projet",
    },
    {
        slug: "charles-abj",
        name: "Charles B.",
        role: "Développeur web",
        avatar: "/images/logos/logo-dark.webp",
        portfolioUrl: "https://charlesabj.com",
        email: "charles@centralabj.com",
        phoneLabel: "Appel ou WhatsApp",
        phones: {
            fr: {
                phone: "+33612345678",
                whatsapp: "https://wa.me/33612345678",
            },
            ch: {
                phone: "+41763694154",
                whatsapp: "https://wa.me/41763694154",
            },
        },
        linkedin: "https://www.linkedin.com/in/charlesabj-78753b182/",
        calendarUrl: "https://cal.eu/central-abj/charles",
    },
];

export function getCardProfile(slug: string) {
    return cardProfiles.find((profile) => profile.slug === slug);
}