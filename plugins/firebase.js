import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyB9S0h7eP065d3OZsczxCDaF5GpfaQtiSM",
    authDomain: "picon-app.firebaseapp.com",
    databaseURL: "https://picon-app.firebaseio.com",
    projectId: "picon-app",
    storageBucket: "picon-app.appspot.com",
    messagingSenderId: "713857545152",
    appId: "1:713857545152:web:a1ff396d7cfc288b"
  })
}

export default firebase