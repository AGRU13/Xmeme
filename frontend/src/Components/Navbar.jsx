import React from 'react';
import './Navbar.scss';
import Logo from './../assests/close.svg';

const navbar=()=>{

    // const addMeme=()=>{        
    // }

    return(
        <nav className="content-header">
            <div className="logo">
                <img className='logo__image' src={Logo} alt="X"/>
                <div className='logo__name'>meme</div>
            </div>
            <button className='add-meme'>Add meme</button>
        </nav>
    );
} 

export default navbar;