import { useLocation } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { projectFirestore } from '../../firebase/config'
import { useState, useEffect } from 'react'
//styles
import './Search.css'
//components
import RecipeList from '../../components/RecipeList'

export default function Search() {

  const { mode } = useTheme()
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)
  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString)
  const query = queryParams.get('q')
  
  
    

  useEffect(() => {

    async function getContainsSearchQuery() {
      const inTitle = projectFirestore.collection('recipes').where('title', "==", query).get()
      const inIng =projectFirestore.collection('recipes').where('ingredients', "array-contains", query).get()
    
      const [titleSnapshot, ingSnapshot] = await Promise.all([inTitle, inIng])
      //combine the two arrays and return an array of only unique elements
      const inTitleArray = titleSnapshot.docs
      const inIngArray = ingSnapshot.docs
      const allResults = inIngArray.concat(inTitleArray)
      const uniqueIds = []
      const uniqueArray = allResults.filter((e) => {
        const isDupe = uniqueIds.includes(e.id)
        if (!isDupe) {
          uniqueIds.push(e.id)
          return true
        }
        return false
      })
      return uniqueArray
    }

    setIsPending(true)
    getContainsSearchQuery().then(result => {
      if (result.empty) {
        setError('no recipes to load')
        setIsPending(false)
      }
      else {
        let results = []
        result.forEach((doc) => {
          let newDoc = {id: doc.id, ...doc.data()}
          results.push(newDoc)
        })
        setData(results)
        setIsPending(false)
          }
        }
    )}, [query])
 




  return (
    <div className='container min-vh-100'>
      <h2 className={`page-title ${mode}`}>Recipes including "{query}"</h2>
      {error && <p className={`error ${mode}`}>{ error }</p>}
      {isPending && <p className='loading'> Loading </p>}
      <br/>
      { data && <RecipeList recipes={ data }/>}

    </div>
  )
}
