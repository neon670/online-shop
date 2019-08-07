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

  export const createUserProfileDocument = async(userAuth, addtionalData ) =>{
    if(!userAuth) return;

    const userRef = firestore.doc(`(users/${userAuth.uid})`);
    const snapShop = await userRef.get();
    
    if(!snapShop.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...addtionalData
        })
      }catch(error){
        console.log('error creating user', error.message);
      }
    }
    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
