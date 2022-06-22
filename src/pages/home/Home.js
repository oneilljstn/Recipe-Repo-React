import { projectFirestore } from '../../firebase/config'
import { useEffect } from 'react'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
//styles
import './Home.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// components 
import RecipeList from '../../components/RecipeList'
import { useTheme } from '../../hooks/useTheme'


export default function Home() {

  const { currentUser } = useAuth()
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)
  const [archived, setArchived] = useState(false)
  const { mode } = useTheme()

  useEffect(() => {
    
    // Get recipe data from firestore - Subscribe instead of Get to keep data up to date
    setIsPending(true)
    const unsub = projectFirestore.collection('recipes').onSnapshot((snapshot) => {
      if (snapshot.empty) {
        setError('no recipes to load')
        setIsPending(false)
      }
      else {
        let results = []
        snapshot.docs.forEach((doc) => {
          results.push({id: doc.id, ...doc.data()})
          
        })
        setData(results)
        setIsPending(false)
      }
    }, (err) => {
      setError(err.message)
      setIsPending(false)
    })

    return () => unsub()

  },[])

  return (
    <div className='container min-vh-100'>
      {currentUser && <h2 style={{color:mode === 'dark' ? '#e4e4e4' : 'black', fontSize:''}}>Logged in as: {currentUser.email}</h2>}
      <h2 className={`text-center page-title ${mode}`}>All Recipes</h2>
      <br/>
        {error && <p className='error'>{ error }</p>}
        {isPending && <p className='loading'> Loading... </p>}
        {data && <RecipeList recipes={data} archived={archived}/>}
        
        <label className={`archived-label ${mode}`}>
          <label className="switch">
            <input type="checkbox" onClick={() => setArchived(archived ? false : true)}/>
            <span className="slider round"></span>
          </label>
          <br/>
          Show Archived 
        </label>
        
    </div>
  )
}
