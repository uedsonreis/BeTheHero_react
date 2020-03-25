import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from 'services/api'
import logoImg from '../../assets/logo.svg'

import { NGO, Incident } from 'entities'

import './styles.css'

declare var localStorage: Storage;

type State = { incidents: Incident[] }

export default class ProfilePage extends React.Component<any, State> {
    
    private ngo: NGO;

    constructor(props: any) {
        super(props)
        
        this.ngo = JSON.parse(localStorage.getItem('ngo')!) as NGO
        
        this.state = { incidents: [] }
    }

    private updateList(): void {
        api.get('profile', {
            headers: { Authorization: this.ngo.id }
        }).then((response: any) => {
            console.log('The incidents are here: ', response.data)
            this.setState({ incidents: response.data })
        }).catch((error: any) => {
            console.log(error)
            alert(error)
        })
    }

    componentWillMount() {
        this.updateList()
    }

    private async handleLogout(): Promise<void> {
        localStorage.clear()
        this.props.history.push('')
    }

    private async handleDelete(incident: Incident): Promise<void> {
        const response = await api.delete(`incidents/${incident.id}`, {
            headers: { Authorization: this.ngo.id }
        })
        console.log('Response to save incident: ', response)
        this.updateList()
    }
    
    render(): ReactNode {
        const { incidents } = this.state
        
        return (
            <div className="profile-container">
                <header>
                    <img src={logoImg} alt="Be The Hero" />
                    <span>Bem vinda, {this.ngo.name}</span>

                    <Link className="button" to="/incidents/new">
                        Cadastrar novo caso
                    </Link>
                    <button type="button" onClick={() => this.handleLogout()}>
                        <FiPower size={18} color="#E02041" />
                    </button>
                </header>

                <h1> Casos Cadastrados </h1>

                <ul>
                    {incidents.map(incident => (
                        <li key={incident.id}>
                            <strong>Caso:</strong>
                            <p>{incident.title}</p>

                            <strong>Descrição:</strong>
                            <p>{incident.description}</p>

                            <strong>Valor:</strong>
                            <p>{
                                Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                                    .format(incident.value)
                            }</p>
                            <button type="button" onClick={() => this.handleDelete(incident)}>
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

}