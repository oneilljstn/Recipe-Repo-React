import { useState, useRef } from 'react'
import { projectFirestore, storage } from '../../firebase/config'
import { useHistory } from "react-router-dom"
import { v4 as uuid } from "uuid";
import { useTheme } from '../../hooks/useTheme'
import { Progress } from 'semantic-ui-react';
import { Alert, Form, Button, Container } from 'react-bootstrap'
//import  ProgressBar from '../../components/ProgressBar'

//styles
import './Create.css'
import "bootstrap/dist/css/bootstrap.min.css"



export default function Create() {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [file, setFile] = useState("");
  const ingredientInput = useRef(null)
  const history = useHistory()
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(0)
  const { mode } = useTheme()




  const handleSubmit = (e) => {
    e.preventDefault()
    // function to upload image to firestore and set the download url state
    uploadImage()
    
  }
  
  const handleAdd = (e) => {
    e.preventDefault()
    const ing = newIngredient.trim()
    if (ing && !ingredients.includes(ing)) {
      setIngredients(prevIngredients => [...prevIngredients, ing])
      }
    setNewIngredient('')
    ingredientInput.current.focus()
  }

  const handleChange = (e) => {
    if (e.target.files[0]) {
        setFile(e.target.files[0])
      }
    }

  const uploadImage = () => {
    setIsPending(true)
    if (!file) {
      
      alert("Please upload an image first!");
      console.log("no image 1")
      setIsPending(false)
      return
      
    }
    const uniqueId = uuid();

    // Upload file to the object 'images/uniquename+imagename.jpg'
    const uploadTask = storage.ref(`images/${uniqueId}_${file.name}`).put(file);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on
      ('state_changed',
        (snapshot) => {
          console.log(progress)
          var prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;     
          
          console.log('Upload is ' + prog + '% done');
          setProgress(prog)
          
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          console.log("error: " + error);
          setError(error)
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then((imgURL) => {
            console.log('uploaded image: ' + imgURL);
            const doc = { archived: false, title, ingredients, method, image: imgURL }
            projectFirestore.collection('recipes').add(doc)
            setIsPending(false)
            history.push('/')
          })


        }
      )

  }

  
 
  const handleIngDelete = (ing) => {
    setIngredients(ingredients.filter((ingredient) => {
      return ingredient !== ing
    }))
  }
  

  return (
    <div className={`create ${mode} container min-vh-100`}>
      <Container>
      <h2 className={`text-center page-title ${mode}`}>Add a New Recipe</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setTitle(e.target.value)}
            value ={ title } 
          /> 
        </Form.Group>

        <Form.Group>
          <Form.Label>Method</Form.Label>
          <Form.Control 
            as="textarea" rows={3}
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Ingredients</Form.Label>
          <div className="ingredients">
            <Form.Control type="text" 
            onChange={(e) => setNewIngredient(e.target.value)}
            value = {newIngredient}
            ref = {ingredientInput}
            />
            <Button className='btn' onClick={handleAdd}>add</Button>
          </div>
        </Form.Group>
        {/* TODO Add hover linethrough to remove ingredietns from list */}
        <p>
          {ingredients.map(ing => 
            <em 
              className='ingredient-list'
              id={ing}
              key={ing}
              onClick={() => handleIngDelete(ing)}>
                {ing},
            </em>
          )}
        </p>
        
    
        
        <Form.Group>
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" onChange={handleChange} />
        </Form.Group>
        <br/>
        <Button className="btn">Submit</Button>
        

      </Form>
      {isPending && <Progress percent={progress} />}
      {isPending && <h3>Uploaded {progress}%</h3> }
      {error && <Alert variant='error'> {error} </Alert>}
      </Container>
    </div>
  )
}
