import React from 'react';
import './header.css'
function Header({lanchonete}) {
    return (
        <div className='header'>
            <h1>{lanchonete}</h1>
        </div>
    );
}

export default Header;