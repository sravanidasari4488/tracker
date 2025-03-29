import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIMc3SNDIslvaQ0MTMvCqy56z7K22boTE",
  authDomain: "tracking-app-fb09c.firebaseapp.com",
  projectId: "tracking-app-fb09c",
  storageBucket: "tracking-app-fb09c.appspot.com",
  messagingSenderId: "67297876813",
  appId: "1:67297876813:web:8e0feb3f66b9f9804d7504",
  measurementId: "G-L601BTYGTF",
};

// Ensure Firebase is initialized only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Export Firebase services
const auth = getAuth(app);

export { app, auth };
