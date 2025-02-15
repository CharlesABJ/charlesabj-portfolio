"use client";
import Image from 'next/image';
import React, { useEffect } from 'react';

function Page() {
    useEffect(() => {
        const redirectToHome = () => {
            setTimeout(() => {
                window.location.href = "/";
            }, 4000);
        };
        redirectToHome();
    }, []);

    return (
        <main className='merci'>
            <h1><span>Merci</span> pour votre message</h1>

            <h2>
                Je vous répondrais dans <span>les plus brefs délais !</span>
            </h2>
            <div className="paper-plane">
                <Image src="/images/paper-plane.gif" alt="paper-plane" width={100} height={100} priority />

            </div>
        </main>
    );
}

export default Page;