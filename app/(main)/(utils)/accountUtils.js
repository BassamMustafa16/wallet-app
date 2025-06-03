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
 * Deletes an account document from the 'accounts' collection in Firestore.
 * @param {string} accountId
 * @returns {Promise<void>}
 */
export async function deleteAccount(accountId, userId) {
  if (!accountId) throw new Error("Account ID is required");
  const accountRef = doc(db, "users", userId, "accounts", accountId);
  await deleteDoc(accountRef);
}
