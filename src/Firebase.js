import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyDUf8Hf3qv3_IsHXeO1vxUMHXQqHL-4yWU",

  authDomain: "kuis2-pbf-d0b16.firebaseapp.com",

  databaseURL: "https://kuis2-pbf-d0b16-default-rtdb.firebaseio.com",

  projectId: "kuis2-pbf-d0b16",

  storageBucket: "kuis2-pbf-d0b16.appspot.com",

  messagingSenderId: "487863186387",

  appId: "1:487863186387:web:24063202ef365129253526",

  measurementId: "G-TG4FBQP44T"

};

firebase.initializeApp(config);
firebase.firestore().settings(settings);

export default firebase;
