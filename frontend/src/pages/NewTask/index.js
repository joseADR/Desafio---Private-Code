import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import './styles.css'
import logoImg from '../../assets/logo.png'
import api from '../../services/api'


export default function NewTask() {
    const [title , setTitle ] = useState('')
    const [description , setDescription ] = useState('')
    const history =  useHistory()
    const user_id = localStorage.getItem('user_id')

    async function handleNewTask(e){
        e.preventDefault()

        const data = {
            title,
            description,
        }

        try {
            await api.post('tasks', data, {
                headers: {
                    Authorization: user_id
                }
            })

            history.push('/profile')
        } catch (error) {
            alert("Erro ao tentar adicionar o caso, tente novamente!")
        }
    }

    return (
        <div className="new-task-container">
            <div className="content">
                <section>
                    <img className="logo" src={logoImg} alt="Be the HERO"/>
                    <h1>Cadastre uma nova tarefa</h1>
                    <p>Descreva a tarefa que deseja cronometrar.</p>
                    
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para o home
                    </Link>
                </section>
                <form onSubmit={ handleNewTask } > 
                    <input
                        placeholder="Titulo da tarefa"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <button className="button" type="submit">cadastrar</button>
                </form>
            </div>
        </div>
    )
}