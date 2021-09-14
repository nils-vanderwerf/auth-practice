import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Form, Button, Card, Alert} from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    //Signup context function
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory() 


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
            </Card.Body>
          </Card> 
          <div className="w-100 text-center mt-2">
           Need an account? <Link to="/signup">Register</Link>  
          </div> 
        </>
    )
}
