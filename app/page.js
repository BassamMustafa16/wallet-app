"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import LoginForm from "./components/LoginForm";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/transactions");
      }
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center h-screen p-5 ">
      <LoginForm />
    </div>
  );
}
