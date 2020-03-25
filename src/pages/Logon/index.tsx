import React, { ReactNode, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

import './styles.css'

declare var localStorage: Storage;

type State = { id: string }

export default class LogonPage extends React.Component<any, State> {

    constructor(props: any) {
        super(props)

        this.state = { id: '' }
    }

    private handleLogon = async (event: FormEvent) => {
        event.preventDefault()

        const { id } = this.state

        try {
            const response = await api.post('sessions', { id })
            localStorage.setItem('ngo', JSON.stringify(response.data))
            this.props.history.push('/profile')

        } catch (error) {
            console.error('Error on logon: ', error)
            alert("ID não encontrado.")
        }
    }

    render(): ReactNode {
        const { id } = this.state

        return (
            <div className="logon-container">
                <section className="form">
                    <img src={logoImg} alt="Be The Hero" />

                    <form onSubmit={this.handleLogon}>
                        <h1>Faça seu logon</h1>

                        <input placeholder="Sua ID" value={id}
                            onChange={e => this.setState({ id: e.target.value })}
                        />
                        <button className="button" type="submit">Entrar</button>

                        <Link className="back-link" to="/register">
                            <FiLogIn size={16} color="#E02041" />
                            Não tenho cadastro
                        </Link>
                    </form>

                </section>

                <img src={heroesImg} alt="Heroes" />
            </div>
        )
    }

}