import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDysAaRKSumYohtsX-nt5IYYqM0JIIfvhM",
  authDomain: "chatfirebase-90d24.firebaseapp.com",
  databaseURL: "https://chatfirebase-90d24.firebaseio.com",
  projectId: "chatfirebase-90d24",
  storageBucket: "chatfirebase-90d24.appspot.com",
  messagingSenderId: "161159419638"
  };
  
  export const firebaseApp = firebase.initializeApp(config);