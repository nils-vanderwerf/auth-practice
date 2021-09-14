import React, { useRef, useState } from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    //Signup context function
    const { signup, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)


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
        } catch {
            setError('Failed to create an account')
        }
        //after finished trying to sign up
        setLoading(false)
    }
    return (
        <>
          <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                {currentUser?.email}
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
                    <Button disabled={loading} type="submit" className="w-100">Sign Up</Button>
                </Form>
            </Card.Body>
          </Card> 
          <div className="w-100 text-center mt-2">
            Already have an account? Log In  
          </div> 
        </>
    )
}
