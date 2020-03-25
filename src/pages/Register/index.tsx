import React, { ReactNode, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'
import logoImg from '../../assets/logo.svg'

import { NGO } from 'entities'

import './styles.css'

type State = { ngo: NGO }

export default class RegisterPage extends React.Component<any, State> {

    constructor(props: any) {
        super(props)

        this.state = { ngo: {} as NGO }
    }

    private handleRegister = async (event: FormEvent) => {
        event.preventDefault()

        try {
            const response = await api.post('ngos', this.state.ngo)
            alert(`Seu ID de acesso: ${response.data}`)
            this.props.history.push('/')
        } catch (error) {
            console.error('Error on save the NGO: ', error)
            alert("Erro no cadastro, verifique as informações e tente novamente.")
        }
    }

    render(): ReactNode {
        const { ngo } = this.state

        return (
            <div className="register-container">
                <div className="content">
                    <section>
                        <img src={logoImg} alt="Be The Hero" />

                        <h1>Cadastro</h1>
                        <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                        
                        <Link className="back-link" to="/">
                            <FiArrowLeft size={16} color="#E02041" />
                            Não tenho cadastro
                        </Link>
                    </section>

                    <form onSubmit={this.handleRegister}>
                        <input placeholder="Nome da ONG"
                            value={ngo.name}
                            onChange={e => this.setState({ ngo: { ...ngo, name: e.target.value }})}
                        />
                        <input type="email" placeholder="E-mail"
                            value={ngo.email}
                            onChange={e => this.setState({ ngo: { ...ngo, email: e.target.value }})}
                        />
                        <input placeholder="Whatsapp"
                            value={ngo.whatsapp}
                            onChange={e => this.setState({ ngo: { ...ngo, whatsapp: e.target.value }})}
                        />

                        <div className="input-group">
                            <input placeholder="Cidade"
                                value={ngo.city}
                                onChange={e => this.setState({ ngo: { ...ngo, city: e.target.value }})}
                            />
                            <input placeholder="UF" style={{ width: 80 }}
                                value={ngo.uf}
                                onChange={e => this.setState({ ngo: { ...ngo, uf: e.target.value }})}
                            />
                        </div>

                        <button className="button" type="submit">
                            Cadastrar
                        </button>
                    </form>
                </div>
            </div>
        )
    }

}