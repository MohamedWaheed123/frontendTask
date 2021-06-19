import firebase from 'firebase/app';
import  'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/functions';

var firebaseConfig = {
    apiKey: "AIzaSyB8xgreKji3ujpUtXKA9bAB-gHSvFEvzz4",
    authDomain: "fakeshop-240cf.firebaseapp.com",
    projectId: "fakeshop-240cf",
    storageBucket: "fakeshop-240cf.appspot.com",
    messagingSenderId: "56776785502",
    appId: "1:56776785502:web:f97bd1adfcf70681ad7ecf"
  };
  
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
  export default firebase;