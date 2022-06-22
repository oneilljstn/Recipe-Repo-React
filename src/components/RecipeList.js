import { Link } from 'react-router-dom'

import { useTheme } from '../hooks/useTheme'

import { Card, Button, Row, Col } from 'react-bootstrap'


//styles
import './RecipeList.css'
import "bootstrap/dist/css/bootstrap.min.css"

export default function RecipeList({ recipes, archived: showArchived }) {
  
  const { mode } = useTheme()
  
  
  
  if (recipes.length === 0) {
    return <div className='error'>No recipes found</div>
  }


  return (
    <Row xs="auto">

        {recipes.map((recipe) => (
           
            (!recipe.archived || showArchived) &&
            
            <Col key={ recipe.id } >
            <div className={`${recipe.id} ${recipe.archived && 'archived'}`}>
             <Card text='white'  bg={mode} style={{ width: '23rem' }} border={recipe.archived ? "danger" : ""}>
              <Card.Img variant="top" src={recipe.image} alt={recipe.title} />
              <Card.Body>
              <Card.Title style={{color:mode === 'dark' ? 'white' : 'black'}}>{recipe.title}</Card.Title>
              <Card.Subtitle style={{color:mode === 'dark' ? 'white' : 'black'}}> Subtitle</Card.Subtitle>
              <Card.Text style={{color:mode === 'dark' ? 'white' : 'black'}}
                
              >
              { recipe.method.substring(0,100)}...
              </Card.Text>
              <Button variant='primary' className='w-100'>
              <Link style={{color: 'white', textDecoration: 'none'}} to={`/recipes/${recipe.id}`}>Cook this</Link>
              </Button>
            </Card.Body>
             </Card>
             <br />
             </div>
            </Col>
               
                   

        ))}

    </Row>
  )
}
