import React, {useRef, useState} from 'react'
import { Card, Form, Button, Alert, Container, Row} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'


export default function Signup() {

const emailRef = useRef()
const passwordRef = useRef()
const passwordConfirmRef = useRef()
const { signup } = useAuth()
const [error, setError] = useState(null)
const [loading, setLoading] = useState(false)

async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError('Passwords do not match')
    }
    try {
        setLoading(true)
        setError('')
        console.log(emailRef.current.value, passwordRef.current.value)
        await signup(emailRef.current.value, passwordRef.current.value)
        
    }
    catch {
        setError('failed to create account')
    }
    setLoading(false)
    
}
  return (
    
    <Container className='min-vh-100' >
            <Row className='justify-content-md-center'>
              <div className='w-100' style={{maxWidth: "400px"}}>
              <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Sign Up</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group id='password-confirm'>
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type='password' ref={passwordConfirmRef} required />
                    </Form.Group>
                    <br />
                    <Button disabled={loading} type='submit' className='w-100'>Submit</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Already have an account? <Link to="/login">Log In</Link>
        </div>
              </div>
              </Row>
    </Container>
    
   
  )
}
