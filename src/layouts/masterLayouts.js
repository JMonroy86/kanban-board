import React, { useContext } from 'react'
import { Context } from '../store/appContext'

import { Route, Redirect } from 'react-router-dom'

const Master = ({ children }) => {
    return <div>{children}</div>
}
const MasterRoute = ({ component: Component, ...others }) => {
    const { store, actions } = useContext(Context)

    if (store.currentUser === null) {
        const user = localStorage.getItem('auth')
        if (user !== null) {
            actions.revalidate(JSON.parse(user))
        } else {
            return <Redirect to="/" />
        }
    }
    return (
        <Route
            {...others}
            render={props => (
                <Master>
                    <Component {...props} />
                </Master>
            )}
        />
    )
}

export default MasterRoute
