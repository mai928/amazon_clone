import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey:process.env.REACT_APP_API_KEY || 'test',
    authDomain:process.env.REACT_APP_AUTH_DOMAIN || 'test',
    projectId: process.env.REACT_APP_PROJECT_ID || 'test',
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET || 'test',
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID || 'test',
    appId: process.env.REACT_APP_APP_ID || 'test',
  };

  const app =initializeApp(firebaseConfig)
  const auth =getAuth(app)
  const db =getFirestore(app)

  export {auth ,db}

