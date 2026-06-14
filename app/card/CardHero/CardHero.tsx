import React from "react";
import Image from "next/image";

type CardHeroProps = {
    name: string;
    role: string;
};

function CardHero({ name, role }: CardHeroProps) {
    return (
        <div className="CardHero">
            <div className="logo">
                <Image
                    src="/images/logos/logo-abj.svg"
                    alt="Logo Central ABJ"
                    width={50}
                    height={50}
                />
            </div>

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
                    <h2 className="name">
                        {name}
                    </h2>

                    <span className="role">
                        {role}
                    </span>
                </div>
            )}
        </div>
    );
}

export default CardHero;