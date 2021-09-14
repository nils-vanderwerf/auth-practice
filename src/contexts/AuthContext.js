import { getAuth } from '@firebase/auth'
import React, {useContext, useEffect, useState} from 'react'
import {auth} from '../firebase'

const AuthContext = React.createContext()
export function useAuth() {
    return useContext(AuthContext)
}
export function AuthProvider( { children } ) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)    
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setLoading(false)
            setCurrentUser(user)
        })
        //unssubscribe to changes when we unmount conponent
        return unsubscribe
    }, [])

    //set the user here
  
    const value = {
        currentUser,
        signup
    }
    return (
        <AuthContext.Provider value={value}>
            {/* Do not set the children if loading */}
            {!loading && children}
        </AuthContext.Provider>
    )
}
