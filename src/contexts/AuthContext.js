
import { getAuth } from '@firebase/auth'
import React, {useContext, useEffect, useState} from 'react'
import { useHistory } from 'react-router'
import {auth} from '../config/firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}
export function AuthProvider( { children } ) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const history = useHistory()

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

    function updateEmail(email){
        return currentUser.updateEmail(email)
    }
    function updatePassword(password){
        return currentUser.updatePassword(password)
    }

    function signInWithGoogle(googleProvider) {
        console.log("Calling function", googleProvider)
        auth.signInWithPopup(googleProvider).then((res) => {
            console.log("USER", res.user)
        }).catch((error) => {
            console.error("ERROR", error.message)
        })
    }

    function signInWithFacebook(facebookProvider) {
        console.log("Calling function", facebookProvider)
        auth.signInWithPopup(facebookProvider)
            .then(res => res.user)
            .then(() => history.push("/"))
            .catch((error) => {
            console.error("ERROR", error.message)
        })
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            console.log("NEW USER", user)
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
        resetPassword,
        updateEmail,
        updatePassword,
        signInWithGoogle,
        signInWithFacebook
    }
    return (
        <AuthContext.Provider value={value}>
            {/* Do not set the children if loading */}
            {!loading && children}
        </AuthContext.Provider>
    )
}
