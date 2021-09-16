import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import firebase from "firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
console.log("Google", googleProvider, "Facebook", facebookProvider)

export default function Login() {
    const { currentUser, logout } = useAuth()
    const emailRef = useRef()
    const passwordRef = useRef()
    //Signup context function
    const { login, signInWithGoogle, signInWithFacebook } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    

    const state = currentUser
    console.log("The user is", state)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            //so the user doesn't keep clicking and create multiiple accounts
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError('Failed to log in')
        }
        //after finished trying to sign up
        setLoading(false)
    }

    async function handleGoogleSignIn(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            const res = await signInWithGoogle(googleProvider);
            history.push("/")
        } catch (err) {
            console.log("====WE HAVE AN ERROR====")
            setError('Failed to log in')
        }
        setLoading(false)
    }
    //   };
    async function handleFacebookSignIn(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            const res = await signInWithFacebook(facebookProvider);
            history.push("/")
        } catch (err) {
            setError('Failed to log in')
        }
        setLoading(false)
    }
    //   };
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>

                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>

                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>

                        {/* if user is loading, button is loading */}
                        <Button disabled={loading} type="submit" className="w-100 mt-2">Log In</Button>
                    </Form>
                    <div className="social-btn text-center mt-3">
                        <Button onClick={handleGoogleSignIn} disabled={loading} className="btn btn-danger w-100 mt-2">
                            <FontAwesomeIcon icon={['fab', 'google']} /> Login in with
                            <strong> Google</strong>
                        </Button>
                        <Button onClick={handleFacebookSignIn} disabled={loading} className="btn btn-primary w-100 mt-2">
                            <FontAwesomeIcon icon={['fab', 'facebook-f']} /> Login with
                            <strong> Facebook</strong>
                        </Button>

                        {/* <a href="#" class="btn btn-info btn-block w-100 mb-2"><i class="fa fa-twitter"></i> Sign in with <strong>Twitter</strong></a> */}
                    </div>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Register</Link>
            </div>
        </>
    )
}
