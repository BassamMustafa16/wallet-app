import { db } from "@/app/lib/firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

/**
 * Fetches all accounts for a given user ID.
 * @param {string} userId
 * @returns {Promise<Array>}
 */
export async function fetchAccounts(userId) {
  const q = query(collection(db, "accounts"), where("uid", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/**
 * Deletes an account document from the 'accounts' collection in Firestore.
 * @param {string} accountId
 * @returns {Promise<void>}
 */
export async function deleteAccount(accountId) {
  if (!accountId) throw new Error("Account ID is required");
  const accountRef = doc(db, "accounts", accountId);
  await deleteDoc(accountRef);
}
