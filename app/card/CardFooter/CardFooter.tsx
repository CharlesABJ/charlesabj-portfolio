import Link from 'next/link'
import React from 'react'

const CardFooter = () => {
    return (
        <div className="CardFooter">
            <hr />
            <div className="words">
                <span>Clarté</span> • <span>Expérience</span>  • <span>Impact</span>
            </div>

            <Link className="link" href="/">charlesabj.com</Link>
        </div>
    )
}

export default CardFooter