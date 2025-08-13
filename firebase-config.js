// firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZLkwaI2GP1S8ivRdMPBvRThUmbMDh7Xk",
  authDomain: "ar-store-b65b4.firebaseapp.com",
  projectId: "ar-store-b65b4",
  storageBucket: "ar-store-b65b4.firebasestorage.app",
  messagingSenderId: "1039884734261",
  appId: "1:1039884734261:web:acfca23b0348d5b047c67c",
  measurementId: "G-ENS3NCNKR2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Analytics
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Export auth for use in other files
export { auth };