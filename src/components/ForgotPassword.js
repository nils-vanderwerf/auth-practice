import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Card, Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

export default function ForgotPassword() {
    const emailRef = useRef()
    //Signup context function
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')


    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage('')
            setError('')
            //so the user doesn't keep clicking and create multiiple accounts
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions.')
        } catch {
            setError('Failed to reset password')
        }
        //after finished trying to sign up
        setLoading(false)
    }
    return (
        <>
          <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Password Reset</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required></Form.Control>
                    </Form.Group>
                    {/* if user is loading, button is loading */}
                    <Button disabled={loading} type="submit" className="w-100 mt-2">Reset Password</Button>
                </Form>
                <div className="w-100 text-center mt-3">
                <Link to="/login">Login</Link>  
          </div> 
            </Card.Body>
          </Card> 
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Register</Link>  
          </div> 
        </>
    )
}
