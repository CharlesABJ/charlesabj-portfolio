import Logo from "@/_components/Logo/Logo";

type CardHeroProps = {
    name: string;
    role: string;
};

function CardHero({ name, role }: CardHeroProps) {

    return (
        <div className="CardHero">
            <Logo />
            <div>
                <h1>
                    Central <span>ABJ</span>
                </h1>
                <hr />
                <p className="function">
                    Développement web & mobile
                </p>
            </div>

            {role !== "Studio numérique" && (
                <div className="employee">
                    <h2 className="name">{name}</h2>
                    <span className="role">{role}</span>
                </div>
            )}
        </div>
    );
}

export default CardHero;
