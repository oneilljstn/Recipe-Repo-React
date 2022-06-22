import React, {useRef, useState} from 'react'
import { Card, Form, Button, Alert, Container} from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import { useAuth } from '../../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function Login() {
  
const emailRef = useRef()
const passwordRef = useRef()
const { login } = useAuth()
const [error, setError] = useState(null)
const [loading, setLoading] = useState(false)
const history = useHistory()

async function handleSubmit(e) {
    e.preventDefault()

    try {
        setLoading(true)
        setError('')
        await login(emailRef.current.value, passwordRef.current.value)
        
        history.push("/")
        
    }
    catch (e) {
        setError('Failed to Log in')
        
    }
    setLoading(false)
    
}
  return (
    
      <Container className='d-flex align-items-center justify-content min-vh-100' style={{ minHeight: "100vh" }}>
          <div className='w-100' style={{ maxWidth: "400px" }}>
              <Card>
                  <Card.Body>
                      <h2 className='text-center mb-4'>Log In</h2>
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
                          <Button disabled={loading} type='submit' className='w-100'>Log in</Button>
                      </Form>
                      <div className='w-100 text-center mt-2'>
                        <Link to="/forgot-password">Forgot Password?</Link>
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
