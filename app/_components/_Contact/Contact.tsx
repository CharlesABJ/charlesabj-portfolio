import { faArrowRight, faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Form from '../Form/Form';


function Contact() {
    return (
        <section id='contact' className="Contact">
            <div className="container">
                <h2>Contactez-Moi</h2>
                <p>Envoyez-moi un message</p>
                <div className="contact-zone">
                    <ul className="classic-contact">
                        <li>
                            <h3>
                                <FontAwesomeIcon icon={faComment} />
                                Discutons ensemble
                            </h3>
                        </li>
                        <li>
                            <ul>
                                <li>
                                    <span>Email</span>
                                </li>
                                <li>
                                    <a className="email" href="mailto:charlesabj3@gmail.com">
                                        charlesabj3@gmail.com
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            {" "}
                            <ul>
                                <li>
                                    <span>Whatsapp</span>
                                </li>
                                <li>
                                    <a
                                        title="Pour la France 🇫🇷: +33 6 30 08 65 92 👋"
                                        href="tel:+41763694154"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        +41 76 369 41 54
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="http://wa.me/41763694154"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Écrivez-moi <FontAwesomeIcon icon={faArrowRight} />
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <ul>
                                <li>
                                    <span>Messenger</span>
                                </li>
                                <li>@CharlesABJ</li>
                                <li>
                                    <a
                                        href="https://m.me/100094215251917"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Écrivez-moi <FontAwesomeIcon icon={faArrowRight} />
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <Form />
                </div>
            </div>
        </section>
    );
}

export default Contact;