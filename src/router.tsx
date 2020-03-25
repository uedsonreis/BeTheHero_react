import React, { ReactNode } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import LogonPage from './pages/Logon'
import RegisterPage from './pages/Register'
import ProfilePage from './pages/Profile'
import NewIncidentPage from './pages/NewIncident'

export default class Router extends React.Component<any, any> {

    render(): ReactNode {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={LogonPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/profile" component={ProfilePage} />
                    <Route path="/incidents/new" component={NewIncidentPage} />
                </Switch>
            </BrowserRouter>
        )
    }

}