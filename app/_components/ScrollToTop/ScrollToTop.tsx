import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function ScrollToTop() {
    return (
        <a href="#home" className="ScrollToTop">
            <FontAwesomeIcon icon={faArrowUp} />
        </a>
    );
}

export default ScrollToTop;