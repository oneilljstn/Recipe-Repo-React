
import { Progress } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'


export default function ProgressBar(uploadPercent) {

    

    
   
  return (
    <div>
        <Progress percent={uploadPercent} indicating />
        
    </div>
  )
  
}
