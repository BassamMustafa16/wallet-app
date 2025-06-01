"use client";
import { signInWithGoogle } from "@/app/lib/firebaseAuth";
import Textbox from "./Textbox";
import Label from "./Label";
import Button from "./Button";
import { auth } from "@/app/lib/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginForm() {
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      alert("Login successful!");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div>
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
      <button
        onClick={handleGoogleSignIn}
        className="border p-3 rounded-xl"
      >
        Sign in with Google
      </button>
    </div>
  );
}
