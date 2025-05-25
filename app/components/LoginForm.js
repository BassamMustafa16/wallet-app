"use client";
import { useRouter } from "next/navigation";
import Textbox from "./Textbox";
import Label from "./Label";
import Button from "./Button";
import app from "@/app/lib/firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginForm() {
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const auth = getAuth(app);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      alert("Login successful!");
      router.push("/transactions");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <form
      className="flex flex-col border justify-center p-5 gap-3 rounded-2xl xs:w-2xs md:w-sm lg:w-md"
      onSubmit={handleSubmit}
    >
      <Label content="Email" labelFor="emailInput" />
      <Textbox
        id="emailInput"
        type="email"
        placeholder="Enter your email"
        name="email"
      />
      <Label content="Password" labelFor="passwordInput" />
      <Textbox
        id="passwordInput"
        type="password"
        placeholder="Enter your password"
        name="password"
      />
      <div className="flex flex-row justify-between gap-2">
        <Button content="Login" type="submit" />
        <Button content="Register" type="button" to="/register" />
      </div>
    </form>
  );
}
