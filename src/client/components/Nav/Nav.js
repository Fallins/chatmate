import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.less'

function Nav() {
    return (
        <nav>
            <div className="container">
                <Link to="/">
                    <div className="brand">
                        <div className="icon" />
                        <span>Chatmate</span>
                    </div>
                </Link>
                <ul className="menu">
                    <li>
                        <Link to="/">Lobby</Link>
                    </li>
                    <li>
                        <Link to="/chat">Chat</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav
