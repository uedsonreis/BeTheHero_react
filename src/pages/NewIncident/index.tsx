import React, { ReactNode, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import { Incident, NGO } from 'entities'

import logoImg from '../../assets/logo.svg'

import './styles.css'

type State = { incident: Incident }

export default class NewIncidentPage extends React.Component<any, State> {

    private ngo: NGO

    constructor(props: any) {
        super(props)

        this.ngo = JSON.parse(localStorage.getItem('ngo')!) as NGO
        
        this.state = { incident: {} as Incident }
    }

    private handleSave = async (event: FormEvent): Promise<void> => {
        event.preventDefault()
        try {
            await api.post('incidents', this.state.incident, {
                headers: { Authorization: this.ngo.id }
            })

            this.props.history.push('/profile')
            
        } catch (error) {
            console.error(error)
            alert('Erro ao tentar salvar.')
        }
    }

    render(): ReactNode {
        const { incident } = this.state

        return (
            <div className="new-incident-container">
                <div className="content">
                    <section>
                        <img src={logoImg} alt="Be The Hero" />

                        <h1>Cadastrar novo caso</h1>
                        <p>Descreva o caso detalhadamente para encontrar um herói que resolva isso.</p>
                        
                        <Link className="back-link" to="/profile">
                            <FiArrowLeft size={16} color="#E02041" />
                            Voltar para home
                        </Link>
                    </section>

                    <form onSubmit={this.handleSave}>
                        <input placeholder="Título do caso"
                            value={incident.title}
                            onChange={e => this.setState({ incident: { ...incident, title: e.target.value }})}
                        />
                        <textarea placeholder="Descrição"
                            value={incident.description}
                            onChange={e => this.setState({ incident: { ...incident, description: e.target.value }})}
                        />
                        <input placeholder="Valor em reais"
                            value={incident.value}
                            onChange={e => this.setState({ incident: { ...incident, value: Number(e.target.value) }})}
                        />

                        <button className="button" type="submit">
                            Cadastrar
                        </button>
                    </form>
                </div>
            </div>
        )
    }

}