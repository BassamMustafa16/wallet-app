import {
  GoogleAuthProvider, // Helps create the Google sign-in provider
  signInWithPopup, // Method for signing in with a popup window
  signInWithRedirect, // Alternative method for signing in with a redirect
  signOut as firebaseSignOut, // Rename signOut to avoid conflicts if needed
  onAuthStateChanged as firebaseOnAuthStateChanged, // Handle auth state changes
  onIdTokenChanged as firebaseOnIdTokenChanged, // Handle ID token changes
} from "firebase/auth";
import { auth } from "@/app/lib/firebaseConfig"; // Import your initialized Firebase app
import { doc, setDoc, getDoc } from "firebase/firestore"; // Add getDoc import
import { db } from "@/app/lib/firebaseConfig"; // Make sure db is imported

export function onAuthStateChanged(cb) {
  // Attach the callback function to the auth state change listener
  return firebaseOnAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(cb) {
  // Attach the callback function to the ID token change listener
  return firebaseOnIdTokenChanged(auth, cb);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  // Simple mobile detection
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  try {
    let result, user;
    if (isMobile) {
      await signInWithRedirect(auth, provider);
      // On redirect, Firebase will handle the result after redirect
      return; // You may want to handle post-redirect logic elsewhere
    } else {
      result = await signInWithPopup(auth, provider);
      user = result.user;
    }

    // Extract first and last name from displayName
    let firstName = "";
    let lastName = "";
    if (user.displayName) {
      const nameParts = user.displayName.split(" ");
      firstName = nameParts[0];
      lastName = nameParts.slice(1).join(" ");
    }

    // Check if user doc exists
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        firstName,
        lastName,
        email: user.email,
      });
      console.log("User document created in Firestore.");
    } else {
      console.log("User document already exists in Firestore.");
    }

    return user;
  } catch (error) {
    console.error("Error signing in with Google", error);
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
