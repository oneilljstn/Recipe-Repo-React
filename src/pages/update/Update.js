import { useState, useEffect, useRef } from 'react'
import { projectFirestore, storage } from '../../firebase/config'
import { useHistory, useParams } from "react-router-dom"
import { v4 as uuid } from "uuid";
import { useTheme } from '../../hooks/useTheme'
import { Progress } from 'semantic-ui-react';
import { Form, Button } from 'react-bootstrap'
//import  ProgressBar from '../../components/ProgressBar'

//styles
import './Update.css'
import "bootstrap/dist/css/bootstrap.min.css"


export default function Update() {
  const [title, setTitle] = useState('')
  const [pageTitle, setPageTitle] = useState('')
  const [method, setMethod] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [file, setFile] = useState("");
  const [image, setImage] = useState(null)
  const ingredientInput = useRef(null)
  const history = useHistory()
  const [progress, setProgress] = useState(0)
  const { mode } = useTheme()
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
 

    //get the current recipe data
    
    const { id } = useParams()   
    useEffect(() => {
        projectFirestore.collection('recipes').doc(id).get().then((doc) => {
            if (doc.exists) {
                setIsPending(false)
                setTitle(doc.data().title)
                setPageTitle(doc.data().title)
                setMethod(doc.data().method)
                setIngredients(doc.data().ingredients)
                setImage(doc.data().image)
            }
            else {
                
                setError("Could not find recipe")
                console.log(error)
            }
        })
    },[id, error])

   

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
    
    if (!file) {
      setIsPending(true)
      console.log("Updating without an image")
      const doc = { archived: false, title, ingredients, method, image: image }
      projectFirestore.collection('recipes').doc(id).update(doc)
      setIsPending(false)
      history.push(`/recipes/${id}`)
      return
      
    }
    setIsPending(true)
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
          setIsPending(false)
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then((imgURL) => {
            console.log('uploaded image: ' + imgURL);
            const doc = { archived: false, title, ingredients, method, image: imgURL }
            projectFirestore.collection('recipes').doc(id).update(doc)
            setIsPending(false)
            history.push(`/recipes/${id}`)
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
    <div className={`update ${mode} container min-vh-100`}>
      <div className='update-title'>
        <h2 className={`page-title text-center ${mode}`}>Updating</h2>
        <h2 className={`page-title text-center name ${mode}`}> {pageTitle}</h2>
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
          type="text"
          
          onChange={(e) => setTitle(e.target.value)}
          value ={ title } 
          required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Method</Form.Label>
          <Form.Control 
            as='textarea' rows={3}
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Ingredients:</Form.Label>
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
        <p>{ingredients.map(ing => <em 
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
        <Button className="btn" type='submit'>Submit</Button>
        

      </Form>
      {isPending && <Progress percent={progress} /> }
      {isPending && <h3>Uploaded {progress}%</h3>}
      
    </div>
  )
}
