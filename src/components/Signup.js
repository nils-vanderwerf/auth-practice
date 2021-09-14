import React, { useRef } from 'react'
import {Form, Button, Card} from 'react-bootstrap'
import { Container } from 'react-bootstrap'

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    return (
        <>
          <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                <Form>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="email" ref={passwordRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="email" ref={passwordConfirmRef} required></Form.Control>
                    </Form.Group>
                    <Button type="submit" className="w-100">Sign Up</Button>
                </Form>
            </Card.Body>
          </Card> 
          <div className="w-100 text-center mt-2">
            Already have an account? Log In  
          </div> 
        </>
    )
}
