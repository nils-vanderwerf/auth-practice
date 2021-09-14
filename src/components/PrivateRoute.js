import userEvent from '@testing-library/user-event'
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth} from '../contexts/AuthContext'

// Create a wrapper for our current route
export default function PrivateRoute({ component: Component, ...rest}) {
    const { currentUser } = useAuth()
    return (
        <Route
           {...rest}
           render={props => {
            // If theres a current user, render the passed in component (that the user is attemping to access), otherwise, redirect to login page
            return currentUser ? <Component {...props}/> : <Redirect to="/login"/>
           }} >
        </Route>
    )
}
