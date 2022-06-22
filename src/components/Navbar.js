import { useTheme } from '../hooks/useTheme'
import { useAuth } from '../context/AuthContext'
import { Navbar as BootNavbar, Nav } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import Logo from "../assets/logo.svg"

//styles
import './Navbar.css'
import "bootstrap/dist/css/bootstrap.min.css"
// components
import Searchbar from './Searchbar'


export default function Navbar() {
  const { color, mode } = useTheme()
  const { currentUser } = useAuth()

  return (
    
        <BootNavbar className={`boot-navbar-${color}`} variant={mode} expand="md">

          <LinkContainer to="/">
            <BootNavbar.Brand href='/'>
            <img
              src={Logo}
              width="40"
              height="40"
              style={{marginLeft:'20px', marginRight:'20px'}}
              className={`d-inline-block align-top brand-img-${mode}`} 
              alt="Recipe-Repo-Logo"
            />
            Recipe Repo
            </BootNavbar.Brand>
          </LinkContainer>
          <BootNavbar.Toggle aria-controls="basic-navbar-nav" />

          <BootNavbar.Collapse className='justify-content-end' id="navbarScroll">

            <Nav className='me-auto'>
              <LinkContainer to='/create'>
                <Nav.Link href="/create">
                  Create Recipe
                </Nav.Link>
              </LinkContainer>
              
              {currentUser 
                ? <LinkContainer to="/profile"><Nav.Link href='/profile'>Profile</Nav.Link></LinkContainer>
                : <LinkContainer to="/login"><Nav.Link href="/login">Log in</Nav.Link></LinkContainer>
              }
              </Nav>
              <Nav>
              < Searchbar />
              </Nav>
            

          </BootNavbar.Collapse>
        </BootNavbar>

   
  )
}
