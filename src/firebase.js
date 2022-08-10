import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyALAKmYd2b4nt6HvO60I_FuNv-Kp4aSggo",
  authDomain: "e-poultry-8888e.firebaseapp.com",
  projectId: "e-poultry-8888e",
  storageBucket: "e-poultry-8888e.appspot.com",
  messagingSenderId: "136698992338",
  appId: "1:136698992338:web:2f62fb99be658f1ea7bf0b",
  measurementId: "G-6W2DN8EBDM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogleAdmin = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const admin = res.user;
    const q = query(collection(db, "admin"), where("uid", "==", admin.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "admin"), {
        uid: admin.uid,
        role: "admin",
        name: admin.displayName,
        authProvider: "google",
        email: admin.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPasswordAdmin = async (role, email, password) => {
  try {
    await signInWithEmailAndPassword(auth, role, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPasswordAdmin = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const admin = res.user;
    await addDoc(collection(db, "admin"), {
      uid: admin.uid,
      role: "admin",
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordResetAdmin = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logoutAdmin = () => {
  signOut(auth);
  if (window.location.pathname !== "/") {
    window.location.href = "/";
  }
};

// export
export {
  auth,
  db,
  signInWithGoogleAdmin,
  logInWithEmailAndPasswordAdmin,
  registerWithEmailAndPasswordAdmin,
  sendPasswordResetAdmin,
  logoutAdmin,
};
