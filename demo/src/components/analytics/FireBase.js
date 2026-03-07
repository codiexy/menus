import firebase from "firebase/compat/app";
import "firebase/compat/analytics";

const firebaseConfig = {
    "apiKey": "AIzaSyCSak7u_7oMyFU6K5Zrs5E_OdKW34xORzs",
    "authDomain": "hot-dog-kings.firebaseapp.com",
    "databaseURL": "https://hot-dog-kings-default-rtdb.firebaseio.com",
    "projectId": "hot-dog-kings",
    "storageBucket": "hot-dog-kings.appspot.com",
    "messagingSenderId": "528899303437",
    "appId": "1:528899303437:web:e3bc54fe4322cc9a464d44",
    "measurementId": "G-8DNV8XEHFQ"
}


firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;