import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import firebase from "firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

console.log("Google", googleProvider, "Facebook", facebookProvider)

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    //Signup context function
    const { signup, signInWithGoogle, signInWithFacebook } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()


    async function handleSubmit(e) {
        e.preventDefault()

        //See if passwords are the same
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            //so the user doesn't keep clicking and create multiiple accounts
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError('Failed to create an account')
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
            console.log(res)
            history.push("/")
        } catch (err) {
            setError('Failed to log in')
        }
        setLoading(false)
    }

    async function handleFacebookSignUp(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            const res = await signInWithFacebook(facebookProvider);
            console.log(res)
            history.push("/")
        } catch (err) {
            setError('Failed to log in')
        }
        setLoading(false)
    }

    return (
        <>
          <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
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
                    <Form.Group id="password">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
                    </Form.Group>
                    {/* if user is loading, button is loading */}
                    <div className="social-btn text-center mt-3 w-100">
                    <Button disabled={loading} className="btn btn-danger btn-block w-100 mt-2">
                        <FontAwesomeIcon icon={['fab', 'google']} /> Sign up with 
                        <strong> Google</strong>
                    </Button>
                    <Button disabled={loading} className="btn btn-primary btn-block w-100 mt-2">
                        <FontAwesomeIcon icon={['fab', 'facebook-f']}/> Sign up with 
                        <strong> Facebook</strong>
                    </Button>
                    </div>
                </Form>
            </Card.Body>
          </Card> 
          <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>  
          </div> 
        </>
    )
}
