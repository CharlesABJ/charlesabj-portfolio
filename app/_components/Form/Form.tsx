import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

function Form() {
    const [submitted, setSubmitted] = useState(false); // État pour le message de confirmation
    const [error, setError] = useState(false); // État pour gérer les erreurs

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Empêche la soumission par défaut et la redirection
        const form = e.target as HTMLFormElement;

        // Collecte les données du formulaire
        const formData = new FormData(form as HTMLFormElement);

        try {
            const response = await fetch('https://formspree.io/f/xzzzklld', {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json',
                },
            });

            if (response.ok) {
                setSubmitted(true); // Affiche le message de confirmation
                setError(false); // Réinitialise les erreurs
                form.reset(); // Réinitialise les champs du formulaire
            } else {
                setError(true); // Indique qu'il y a eu une erreur
            }
        } catch {
            setError(true); // Gestion des erreurs réseau
        }
    };

    return (
        <form
            className="Form"
            method="POST"
            onSubmit={handleSubmit} // Gère la soumission avec `fetch`
        >
            <h3>Parlez-moi de votre projet</h3>
            <div>
                <label htmlFor="name">Nom</label>
                <input
                    required
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Écrivez votre nom"
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Écrivez votre email"
                />
            </div>
            <div>
                <label htmlFor="message">Message</label>
                <textarea
                    required
                    id="message"
                    name="message"
                    minLength={7}
                    placeholder="Présentez votre projet"
                ></textarea>
            </div>
            <button className="submit" type="submit">
                Envoyer <FontAwesomeIcon icon={faArrowRight} />
            </button>
            {submitted && <span className="merci">Merci ! Votre message a bien été envoyé.</span>}
            {error && (
                <span className="error">
                    Une erreur s'est produite. Veuillez réessayer.
                </span>
            )}
        </form>
    );
}

export default Form;