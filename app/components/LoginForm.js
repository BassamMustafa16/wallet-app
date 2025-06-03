"use client";
import Input from "./Input";
import Label from "./Label";
import Button from "./Button";
import { auth } from "@/app/lib/firebaseConfig"; // <-- use this!
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginForm() {
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
        {/* Email Input */}

        <Label content="Email" labelFor="emailInput" />
        <Input
          id="emailInput"
          type="email"
          placeholder="Enter your email"
          name="email"
        />
        {/* Password Input */}
        <Label content="Password" labelFor="passwordInput" />
        <Input
          id="passwordInput"
          type="password"
          placeholder="Enter your password"
          name="password"
        />
        {/* Buttons */}
        <div className="flex flex-row justify-between gap-2">
          <Button content="Login" type="submit" />
          <Button content="Register" type="button" to="/register" />
        </div>
      </form>
    </div>
  );
}
