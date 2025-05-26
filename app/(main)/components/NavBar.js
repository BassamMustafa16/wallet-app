"use client";
import { useRouter } from "next/navigation";
import auth from "@/app/lib/firebaseConfig";
import { signOut } from "firebase/auth";


export default function NavBar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <ul className="flex flex-row border-b p-2">
      <li className="p-2 border-r" onClick={() => router.push("/transactions")}>
        Transactions
      </li>
      <li className="p-2 border-r" onClick={() => router.push("/accounts")}>
        Accounts
      </li>
      <li className="p-2" onClick={handleLogout}>
        Logout
      </li>
    </ul>
  );
}
