import React from 'react'
import {Link} from 'react-router-dom';
import './navbar.css'
import CTA from '../CTA/cta'

export default function navbar() {
    return (
        <div className ='main-header'>
            <div classname='logo-container'>
                <Link className='link logo' to='/'> Somsa</Link>
            </div>
            <nav className='main-nav'>
                <ul classname='nav-list'>
                    <li className='nav-item'>
                        <Link to='/' classname='link nav-link'> Home</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/about' classname='link nav-link'> About</Link>
                    </li>
                    <li>
                        <CTA target='/signin'>Account</CTA>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
