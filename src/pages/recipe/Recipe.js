import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useTheme } from '../../hooks/useTheme'
import { projectFirestore } from '../../firebase/config'
import { Card, Button, ListGroup } from 'react-bootstrap'

//styles
import './Recipe.css'
import 'bootstrap/dist/css/bootstrap.min.css'


export default function Recipe() {

  const { id } = useParams()
  const { mode } = useTheme()
  const [recipe, setRecipe] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsPending(true)
    const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot((doc) => {
      if (doc) {
        setIsPending(false)
        setRecipe(doc.data())
      }
      else {
        setIsPending(false)
        setError("Could not find recipe")
      }
    })
    return () => unsub()

  }, [id])

  const handleArchive = (recipe) => {

    //instead of deleting the document we archive it and allow restoring it later
    console.log('archiving/restoring recipe: ' + id)
    try {
      recipe.archived
        ? projectFirestore.collection('recipes').doc(id).update({ archived: false })
        : projectFirestore.collection('recipes').doc(id).update({ archived: true })
    } catch (e) {
      setError(e)
    }
  }


  return (
    <div className={`recipe ${mode} container min-vh-100`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (

        <Card bg={mode} text={mode === 'dark' ? 'white' : 'dark'}>

          <Card.Img
            variant="top"
            src={recipe.image}
            alt={recipe.name}
            style={{ maxHeight: '60rem', objectFit: 'cover' }}
          />
          <Card.Body>
            <Card.Title as='h1'>
              {recipe.title}
            </Card.Title>
            <ListGroup variant='flush' numbered className={`list-group list-group-mine-${mode}`}>

              {recipe.ingredients.map(ing =>
                <ListGroup.Item as="li" className={`list-group-item ${mode}`} key={ing}>{ing}</ListGroup.Item>
              )}

            </ListGroup>
            <Card.Text>
              {recipe.method}
            </Card.Text>

          </Card.Body>
          <Button className="ms-auto me-auto mb-2 w-30 btn btn-sm" variant="primary">
            <Link className=" text-white text-decoration-none" to={`/update/${id}`}>Update Recipe</Link>
          </Button>
          <Button variant='danger' className='ms-auto me-auto mb-2 w-30 btn btn-sm' onClick={() => {
            if (window.confirm(`Are you sure you wish to ${recipe.archived ? "restore this" : "delete this"} item?`)) handleArchive(recipe)
          }}>{recipe.archived ? 'Restore' : 'Archive'}</Button>
        </Card>

      )}
    </div>
  )
}
