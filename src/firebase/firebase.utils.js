import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAWUT04ZW4XjFLx61R0oIv73U7IF8uo1bU",
    authDomain: "online-shopdb.firebaseapp.com",
    databaseURL: "https://online-shopdb.firebaseio.com",
    projectId: "online-shopdb",
    storageBucket: "",
    messagingSenderId: "378216322491",
    appId: "1:378216322491:web:6a310e2b26669223"
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore;

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
