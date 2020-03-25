import React, { ReactNode } from 'react'

import Router from './router'

import './global.css'

export default class App extends React.Component<any, any> {

    constructor(props: any) {
        super(props)
    }

    render(): ReactNode {
        return (
            <Router />
        )
    }
}