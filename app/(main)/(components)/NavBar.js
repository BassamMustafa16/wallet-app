"use client";
import { useRouter } from "next/navigation";
import { auth } from "@/app/lib/firebaseConfig";
import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function NavBar() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <ul className="flex flex-row border-b p-2">
      <li className="p-2 border-r cursor-pointer" onClick={() => router.push("/transactions")}>
        Transactions
      </li>
      <li className="p-2 border-r cursor-pointer" onClick={() => router.push("/accounts")}>
        Accounts
      </li>
      <li className="p-2 cursor-pointer" onClick={handleLogout}>
        Logout
      </li>
    </ul>
  );
}
