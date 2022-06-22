import React, {useRef, useState} from 'react'
import { Card, Form, Button, Alert, Container} from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

//styles
import "bootstrap/dist/css/bootstrap.min.css"

export default function ForgotPassword() {
  
const emailRef = useRef()
const { resetPassword } = useAuth()
const [error, setError] = useState(null)
const [loading, setLoading] = useState(false)
const [message, setMessage] = useState('')


async function handleSubmit(e) {
    e.preventDefault()

    try {
        setMessage('')
        setLoading(true)
        setError('')
        await resetPassword(emailRef.current.value)
        setMessage('Check you inbox for further instructions')
        
    }
    catch (e) {
        setError('Failed to reset password')
        
    }
    setLoading(false)
    
}
  return (
    
      <Container className='d-flex align-items-center justify-content min-vh-100' style={{ minHeight: "100vh" }}>
          <div className='w-100' style={{ maxWidth: "400px" }}>
              <Card>
                  <Card.Body>
                      <h2 className='text-center mb-4'>Password Reset</h2>
                      {error && <Alert variant="danger">{error}</Alert>}
                      {message && <Alert variant="success">{message}</Alert>}
                      <Form onSubmit={handleSubmit}>
                          <Form.Group id='email'>
                              <Form.Label>Email</Form.Label>
                              <Form.Control type='email' ref={emailRef} required />
                          </Form.Group>
                         
                          <Button disabled={loading} type='submit' className='w-100'>Reset Password</Button>
                      </Form>
                      <div className='w-100 text-center mt-2'>
                  <Link to="/login">Login</Link>
              </div>
                  </Card.Body>
              </Card>
              <div className='w-100 text-center mt-2'>
                  Need an account? <Link to="/signup">Sign Up</Link>
              </div>
          </div>
      </Container>
    
   
  )
}
