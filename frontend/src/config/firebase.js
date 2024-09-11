import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCmTmmz0F4pq864U3NGlnDzFk8WlGa5czY",
  authDomain: "nocountry-pataamiga.firebaseapp.com",
  projectId: "nocountry-pataamiga",
  storageBucket: "nocountry-pataamiga.appspot.com",
  messagingSenderId: "819437022552",
  appId: "1:819437022552:web:5e8cae69909893782a092d",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export default app;
