import React, {useState} from 'react'
import { useAuth } from '../../context/AuthContext'
import { Card, Button, Alert, Container, Row } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

export default function Profile() {

    const [error, setError] = useState()
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError('')
        try {
            await logout()
            history.push('/')
        } catch {
            setError('Failed to logout')
        }

    }

  return (
    <>
        <Container className='min-vh-100' >
            <Row className='justify-content-md-center'>
                
            <Card style={{width: '23rem'}}>
                <Card.Body>
                    <h2 className='text-center mb-4'>Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email: </strong> {currentUser.email}
                        
                    <Link to='/update-profile' className='btn btn-primary w-100 mt-3'>Update Profile</Link>
                </Card.Body>
                
            </Card>
            <div className='w-100 text-center mt-2'>
            <Button variant='link' onClick={handleLogout}>Log Out</Button>
            </div>
            
            </Row>
        </Container>
       
    </>
  )
}
