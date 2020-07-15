import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import keys from './apiKeys.json';

const baseUrl = keys.baseUrl;

axios.interceptors.request.use(function (request) {
  const token = sessionStorage.getItem('token');
  if (token != null) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
}, function (err) {
  return Promise.reject(err);
});

const registerUser = (user) => {
  return firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(cred => {

    let userInfo = {email: cred.user.email};

    cred.user.getIdToken()
      .then((token) => sessionStorage.setItem('token', token))
      .then(() => axios.post(`${baseUrl}/user/adduser`, userInfo));
  });
};

const loginUser = (user) => {
  return firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(cred => {
    cred.user.getIdToken()
      .then((token) => sessionStorage.setItem('token', token));
  });
};

const logoutUser = () => {
  return firebase.auth().signOut();
};

const getUserId = () => {
  return firebase.auth().currentUser.uid;
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  getUserId
};

