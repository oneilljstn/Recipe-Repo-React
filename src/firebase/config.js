import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage';
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyCN6aE-X63qu95ME6jTSkYE-A5lDrFnb0M",
    authDomain: "recipe-repo-27b64.firebaseapp.com",
    projectId: "recipe-repo-27b64",
    storageBucket: "recipe-repo-27b64.appspot.com",
    messagingSenderId: "301694031327",
    appId: "1:301694031327:web:854366301c8ae3f86aa06a"
  }

  // initialise firebase
  firebase.initializeApp(firebaseConfig)

  // init services
  const projectFirestore = firebase.firestore()

  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = firebase.storage();
  
  const auth = firebase.auth() 

export { projectFirestore, storage, auth}
