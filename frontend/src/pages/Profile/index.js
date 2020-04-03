import React, { useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2, FiClock, FiArchive } from 'react-icons/fi'
import '../../services/api'
import './styles.css'
import Clock from '../../components/clock';
import api from '../../services/api'


export default function Logon() {
    const [tasks, settasks] = useState([])
    const history =  useHistory()
    const userName = localStorage.getItem('userName')
    const user_id = localStorage.getItem('user_id')

    

    useEffect(() => {
        api.get('profile', { 
            headers:{
                Authorization: user_id 
                }
            }).then(response => {
                settasks(response.data)
            })
    }, [user_id])

    async function handleDeletetask(id) {
        try {
         await api.delete(`tasks/${id}`,{
             headers: {
                 Authorization: user_id
             }
         })
         
         settasks(tasks.filter(task => task.id !== id))
        } catch (error) {
            alert('Erro ao deletar o caso')
        }
    }

    function handleLogout(){
        localStorage.clear()
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                {/* <img src={logoImg} alt="Be The HERO" /> */}
                <span>Olá, {userName}</span>
                <Link className="button" to="/tasks/new">Cadastrar nova tarefa</Link>
                <div className="button-switch-page">
                    <Link to="/tasks/done" type="button">
                    <button type="button">
                        <FiArchive size={18} color="#E02041" />
                    </button> 
                </Link>
                </div>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <div className="total-tasks-container">
                <h1>Tarefas</h1> 
            </div>
            <ul>
            {tasks.map(task => (
                <div className="tasks-container">
                   <li key={task.id}>
                    <strong>TÍTULO:</strong>
                    <p>{task.title}</p>
                    <strong>MISSÃO:</strong>
                    <p>{task.description}</p>

                    <button type="button" onClick={() => handleDeletetask(task.id)}>
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                    </li> 
                        <div className="clock-container">
                            <h2 className="cronometro">
                                CRONÔMETRO
                            </h2>
                            <FiClock size={20} color="#a8a8b3"/>
                            <Clock></Clock>
                            <button className="button" type="button">
                                Finalizar tarefa
                            </button>
                        </div>
                    </div>
            ))}
            </ul>
        </div>
    )
}