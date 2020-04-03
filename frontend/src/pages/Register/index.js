import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'
import logoImg from '../../assets/logo.png'

export default function Register(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    

    const history =  useHistory()

    async function handleRegister(e){
        e.preventDefault()
        const data = {
            name,
            email,
            password,
        }
        
        try {
            const response = await api.post('users', data)
            alert(`Seu ID de acesso: ${response.data.id}`)
            history.push('/')
        } catch (error) {
            alert('Erro no cadastro, tente novamente')
        }

    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img className="logo" src={logoImg} size={30} alt="be the hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça o seu cadastro, entre na plataforma e ajude pessoas a encontre os casos da sua ONG.</p>
                    
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para o logon
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome de usuário"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                    <input
                        placeholder="Password"
                        type="number"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        />
                    <button className="button" type="submit">cadastrar</button>
                </form>
            </div>
        </div>
    )
}