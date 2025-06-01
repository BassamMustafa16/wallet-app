"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/lib/firebaseConfig";
import { onAuthStateChanged, getRedirectResult } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebaseConfig";
import LoginForm from "./components/LoginForm";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Handle user creation after redirect
    getRedirectResult(auth).then(async (result) => {
      if (result?.user) {
        // Fill user data in Firestore if new
        const user = result.user;
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          const nameParts = user.displayName?.split(" ") || [];
          await setDoc(userRef, {
            firstName: nameParts[0] || "",
            lastName: nameParts.slice(1).join(" ") || "",
            email: user.email,
          });
        }
      }
    });

    // Always listen for auth state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/transactions");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen p-5 ">
      <LoginForm />
    </div>
  );
}
