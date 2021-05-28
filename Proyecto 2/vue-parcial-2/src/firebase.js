import firebase from 'firebase/app'
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyBp_lgzlZ88rOVW0n7fUmGrWPPSlEn9akw",
    authDomain: "vue-parcial-2.firebaseapp.com",
    projectId: "vue-parcial-2",
    storageBucket: "vue-parcial-2.appspot.com",
    messagingSenderId: "985879715979",
    appId: "1:985879715979:web:0b0dc390daa8293298f48e"
  };
  firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();