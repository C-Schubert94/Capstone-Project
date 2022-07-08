import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCnzH6ZyaAdXEzWhXESdTHVoJ-rvB-jsx0",

  authDomain: "capstone-project-f459f.firebaseapp.com",

  projectId: "capstone-project-f459f",

  storageBucket: "capstone-project-f459f.appspot.com",

  messagingSenderId: "502195693224",

  appId: "1:502195693224:web:633a998b34b509aa85049d",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(firebaseConfig);

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);


  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.log('error creating message', error.message);
    }
  }

  return userDocRef;
}