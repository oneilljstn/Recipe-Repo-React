import { useState } from 'react'
import { useHistory} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

//Styles
import './Searchbar.css'
import "bootstrap/dist/css/bootstrap.min.css"




export default function Searchbar() {

    const [term, setTerm] = useState('')
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()

        history.push(`/search?q=${term}`)
    }


  return (
    <div className='searchbar'>
        <Form onSubmit={handleSubmit} className="d-flex">
            
            <Form.Control 
              type="search"
              placeholder='Search...'
              className=''
              id='search'
              onChange={(e) => setTerm(e.target.value)}
              value={ term }
              required
            />
            <Button variant='outline-light' type='submit'> Search
            {/* <img src={Search} alt="search" /> */}
            </Button>
          
        </Form>
    </div>
  )
}
