import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyAXR0gymjSlDdSmFdGW1Y91SbCii9s7aBE",
    authDomain: "crwn-db-24801.firebaseapp.com",
    databaseURL: "https://crwn-db-24801.firebaseio.com",
    projectId: "crwn-db-24801",
    storageBucket: "crwn-db-24801.appspot.com",
    messagingSenderId: "618414203478",
    appId: "1:618414203478:web:2e9878b95f301383e251f7",
    measurementId: "G-KEQSKLMCL5"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log("error creating user", error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;