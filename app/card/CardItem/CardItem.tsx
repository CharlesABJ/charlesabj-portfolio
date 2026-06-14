import Link from "next/link";
import Image from "next/image";

const icons = {
    profile: "/icons/profile.svg",
    email: "/icons/mail.svg",
    phone: "/icons/phone.svg",
    linkedin: "/icons/linkedin.svg",
    github: "/icons/github.svg",
    calendar: "/icons/calendar.svg",
} as const;
export type CardIcon = keyof typeof icons;

type CardItemProps = {
    icon: CardIcon;
    avatar?: string;
    title: string;
    description: string;
    isSpecial?: boolean;

    href?: string;
    onClick?: () => void;
};

export default function CardItem({
    icon,
    avatar,
    title,
    description,
    isSpecial,
    href,
    onClick,
}: CardItemProps) {
    const iconSrc = icons[icon];

    const content = (
        <>
            <div className="icon">
                {avatar ? (
                    <Image
                        src={avatar}
                        alt={title}
                        width={70}
                        height={70}
                        className="avatar"
                    />
                ) : (
                    <Image
                        src={iconSrc}
                        alt={title}
                        width={24}
                        height={24}
                    />
                )}
            </div>

            <div className="text">
                <span className="title">{title}</span>
                <div className="description">
                    {description}
                </div>
            </div>

            <div className="arrow">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9 6L15 12L9 18"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </>
    );

    return (
        <li className={`CardItem ${isSpecial ? "special" : ""}`}>
            {href ? (
                <Link
                    className="item-content"
                    href={href}
                    target="_blank"
                >
                    {content}
                </Link>
            ) : (
                <div
                    className="item-content"
                    onClick={onClick}
                >
                    {content}
                </div>
            )}
        </li>
    );
}