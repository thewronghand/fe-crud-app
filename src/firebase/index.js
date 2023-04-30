import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAK3MmXBzBJYV2E7Iy3C7F6_ns4-w9fqH4",
  authDomain: "fe-crud-app.firebaseapp.com",
  projectId: "fe-crud-app",
  storageBucket: "fe-crud-app.appspot.com",
  messagingSenderId: "644267199420",
  appId: "1:644267199420:web:a36d7fcb231cac222df9b9",
  measurementId: "G-DC44WLGL65",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
