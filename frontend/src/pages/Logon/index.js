import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import api from '../../services/api' 
import './styles.css'
import logo from '../../assets/logo.png'


export default function Logon() {
    const [user_id, setuser_id] = useState('')

    const history =  useHistory()

    async function handleLogin(e) {
        e.preventDefault()

        try {
            const response = await api.post('sessions', { user_id })
            console.log(response.data.userName)

            localStorage.setItem('user_id', user_id)
            localStorage.setItem('userName', response.data.userName)

            history.push('/profile')
        } catch (error) {
            alert("Falha no login, tente novamente")
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logo} className="logo" alt="Time-Management" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input
                        placeholder="Sua ID"
                        value={user_id}
                        onChange={e => setuser_id(e.target.value)}    
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" />
                    Não tenho cadastro
                </Link>
                </form>
            </section>
        </div>
    )
}