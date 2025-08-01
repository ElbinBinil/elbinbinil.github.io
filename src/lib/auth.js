import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider, ADMIN_EMAIL } from "./firebase";

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if user is admin
    if (user.email !== ADMIN_EMAIL) {
      await signOut(auth);
      throw new Error("Unauthorized: Only admin can access this area");
    }

    return user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Check if user is admin
export const isAdminUser = (user) => {
  return user && user.email === ADMIN_EMAIL;
};

// Auth state listener
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
