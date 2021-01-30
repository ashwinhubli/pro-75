import  firebase from 'firebase';
require("@firebase/firestore")

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 
  var firebaseConfig = {
  apiKey: "AIzaSyBQTJ1BFSnhJexU4ewRNiunqYAESUoLook",
  authDomain: "story-hub-35697.firebaseapp.com",
  databaseURL: "https://story-hub-35697.firebaseio.com",
  projectId: "story-hub-35697",
  storageBucket: "story-hub-35697.appspot.com",
  messagingSenderId: "979629213104",
  appId: "1:979629213104:web:aae9a68ccdcbe4a2484275",
  measurementId: "G-RWRMY8NS5Z"
};

  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();