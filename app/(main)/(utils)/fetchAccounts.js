import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebaseConfig";

export async function fetchAccounts(userId) {
  const q = query(collection(db, "accounts"), where("uid", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}