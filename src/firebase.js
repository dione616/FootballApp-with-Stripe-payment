import firebase from "firebase/app"
import "firebase/app"
import "firebase/database"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD9-G4MmzbI37LjuJT1HabcmXoPp-l7t9c",
  authDomain: "m-city-caf04.firebaseapp.com",
  databaseURL: "https://m-city-caf04.firebaseio.com",
  projectId: "m-city-caf04",
  storageBucket: "m-city-caf04.appspot.com",
  messagingSenderId: "87972102603",
  appId: "1:87972102603:web:719c99b47e97cf7f40364e",
  measurementId: "G-DFYFFDTV2X"
}

firebase.initializeApp(firebaseConfig)
/* firebase.analytics(); */

const firebaseDB = firebase.database()

//requests
const firebaseMatches = firebaseDB.ref("matches")
const firebasePromotions = firebaseDB.ref("promotions")

//export
export { firebase, firebaseMatches, firebasePromotions }
