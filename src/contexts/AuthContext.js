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

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)    
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        //unssubscribe to changes when we unmount conponent
        return unsubscribe
    }, [])

    //set the user here
  
    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword
    }
    return (
        <AuthContext.Provider value={value}>
            {/* Do not set the children if loading */}
            {!loading && children}
        </AuthContext.Provider>
    )
}
