// Import necessary modules from Firebase Auth
import {
  GoogleAuthProvider, // Helps create the Google sign-in provider
  signInWithPopup, // Method for signing in with a popup window
  signInWithRedirect, // Alternative method for signing in with a redirect
  signOut as firebaseSignOut, // Rename signOut to avoid conflicts if needed
  onAuthStateChanged as firebaseOnAuthStateChanged, // Handle auth state changes
  onIdTokenChanged as firebaseOnIdTokenChanged, // Handle ID token changes
} from "firebase/auth";
import auth from "@/app/lib/firebaseConfig"; // Import your initialized Firebase app

export function onAuthStateChanged(cb) {
  // Attach the callback function to the auth state change listener
  return firebaseOnAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(cb) {
  // Attach the callback function to the ID token change listener
  return firebaseOnIdTokenChanged(auth, cb);
}

export async function signInWithGoogle() {
  // Create a new Google Auth provider instance
  const provider = new GoogleAuthProvider();

  // Optional: Add scopes or custom parameters if needed
  // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  // provider.setCustomParameters({'login_hint': 'user@example.com'});

  try {
    // Trigger the sign-in flow using a popup window
    await signInWithPopup(auth, provider);
    console.log("Signed in successfully with Google!");
    // Handle successful sign-in (e.g., redirect, update UI)
  } catch (error) {
    // Handle errors during sign-in
    console.error("Error signing in with Google", error);
    // inform user about the error
  }
}

export async function signOut() {
  try {
    // Trigger the sign-out process
    await firebaseSignOut(auth);
    console.log("Signed out successfully!");
    // Handle successful sign-out (e.g., update UI)
  } catch (error) {
    // Handle errors during sign-out
    console.error("Error signing out with Google", error);
    // inform user about the error
  }
}

// You could also define signInWithRedirect if you prefer that flow:
/*
export async function signInWithGoogleRedirect() {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithRedirect(auth, provider);
    console.log("Redirecting for Google sign-in...");
  } catch (error) {
    console.error("Error redirecting for Google sign-in", error);
  }
}
*/
