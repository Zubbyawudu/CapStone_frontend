import React from 'react'
import {  Link, useNavigate } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate()
    const isAuthenticated = localStorage.getItem('isAuthenticated')

    const logout = () => {
        localStorage.clear()
        navigate('/login')
    }   


    return (
        <header style={{ backgroundColor: "black", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link onClick={() => navigate('/')} style={{ color: "white", cursor:'pointer', fontSize:25, textDecoration:'none', fontWeight:'bold' }}>ZUB RENTALS</Link>
                <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => navigate('/add')} className="add-button">Add New Vehicle</button>
                    {isAuthenticated ? <button onClick={logout} className="add-button">Logout</button>
                        : <button onClick={() => navigate('/signup')} className="add-button">SignUp</button>
                    }
                </div>
            </div>
        </header>
    )
}
