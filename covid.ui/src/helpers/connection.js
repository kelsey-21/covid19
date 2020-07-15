import firebase from 'firebase/app';
import firebaseConfig from './apiKeys.json';

const firebaseApp = () => {
  firebase.initializeApp(firebaseConfig.firebaseConfig);
}

export default firebaseApp;