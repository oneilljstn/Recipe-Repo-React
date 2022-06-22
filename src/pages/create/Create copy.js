import { useState, useRef, useEffect } from 'react'
import { projectFirestore, storage } from '../../firebase/config'
import { useHistory } from "react-router-dom"
import { v4 as uuid } from "uuid";
import { useTheme } from '../../hooks/useTheme'
import  ProgressBar from '../../components/ProgressBar'
//styles
import './Create.css'



export default function Create() {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [image, setImage] = useState(null)
  const ingredientInput = useRef(null)
  const history = useHistory()
  const [uploadState, setUploadState] = useState('')
  const [percentUploaded, setPercentUploaded] = useState(null)
  const { mode } = useTheme()




  const handleSubmit = async (e) => {
    e.preventDefault()
    // function to upload image to firestore and set the download url state
    const imgURL = await uploadImage()
    console.log(imgURL)
    const doc = { archived: false, title, ingredients, method, image: imgURL}
    try {
      await projectFirestore.collection('recipes').add(doc)
      history.push('/')
    } 
    catch(err) {
      console.log(err)
    }
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
      setImage(e.target.files[0])
    }
  }

  const uploadImage = () => {
    const uniqueId = uuid();

    return new Promise((resolve, reject) => {
    // Upload file to the object 'images/uniquename+imagename.jpg'
    var uploadTask = storage.ref(`images/${uniqueId}_${image.name}`).put(image);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on
      ('state_changed', // or storage.TaskEvent.STATE_CHANGED
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercentUploaded(progress)
        console.log(percentUploaded)    
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        console.log(error);
          setUploadState(error)
          // An error occurred so inform the caller
          reject(error);
      },
      async () => {
        // Upload completed successfully, now we can get the download URL
        const imgURL = await uploadTask.snapshot.ref.getDownloadURL()
        console.log('uploaded image: ' + imgURL);
        setUploadState("Done")
        // We 'awaited' the imgURL, now resolve this Promise
        resolve(imgURL);
        });
      }
    );
  }
 
  const handleIngDelete = (ing) => {
    setIngredients(ingredients.filter((ingredient) => {
      return ingredient !== ing
    }))
  }
  

  return (
    <div className={`create ${mode}`}>
      <h2 className={`page-title ${mode}`}>Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Title</span>
          <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value ={ title } 
          required
          />
        </label>

        <label>
          <span>Method</span>
          <textarea 
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          ></textarea>
        </label>

        <label>
          <span>Ingredients:</span>
          <div className="ingredients">
            <input type="text" 
            onChange={(e) => setNewIngredient(e.target.value)}
            value = {newIngredient}
            ref = {ingredientInput}
            />
            <button className='btn' onClick={handleAdd}>add</button>
          </div>
        </label>
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
        
    
        
        <label>
        <span>Image</span>
        <input type="file" onChange={handleChange} />
        </label>
        <button className="btn">Submit</button>
        

      </form>
      <ProgressBar percent={percentUploaded} />
    </div>
  )
}
