
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAKOrzV95X226ST580oP1GNXQ5YmQpb5fo",
  authDomain: "codedopes.firebaseapp.com",
  projectId: "codedopes",
  storageBucket: "codedopes.appspot.com",
  messagingSenderId: "637387647802",
  appId: "1:637387647802:web:66a87b0daf2e743b513e03",
  measurementId: "G-WV5G07XV4K"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebaseApp.auth();

export { db, auth };