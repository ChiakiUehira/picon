import firebase from 'firebase'

export default () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      resolve(user)
    })
  })
}