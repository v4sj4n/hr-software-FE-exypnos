
import { initializeApp } from "@firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDHSK5ZaLZYDKEFn4JkKIUnFZfYY40r3x0",
    authDomain: "hrsystem-5d8a8.firebaseapp.com",
    projectId: "hrsystem-5d8a8",
    storageBucket: "hrsystem-5d8a8.appspot.com",
    messagingSenderId: "321176185007",
    appId: "1:321176185007:web:f8c35656bc514fe4104c5a",
    measurementId: "G-75CTCGE2JY"
  };
  

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
