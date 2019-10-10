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

  export const addCollectionAndDocuments = async (
      collectionKey,
      objectsToAdd
    ) => {
      const collectionRef = firestore.collection(collectionKey);

      const batch = firestore.batch();
      objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
  });

    return await batch.commit();
};



 export const convertCollectionsSnapchotToMap = (collections) => {
   const transformedCollection = collections.docs.map(doc => {
     const { title, items } = doc.data();
     return{
       routeName: encodeURI(title.toLowerCase()),
       id: doc.id,
       title,
       items
     };
   });
   return transformedCollection.reduce((accumalator, collection) => {
  accumalator[collection.title.toLowerCase()] = collection;
  return accumalator;
  }, {});
 };

export const getCurrentUser = () => {
  return new Promise ((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}



  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);


  export default firebase;