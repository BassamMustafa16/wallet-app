"use client";
import { useRouter } from "next/navigation";
import auth from "@/app/lib/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import Label from "@/app/components/Label";
import Textbox from "@/app/components/Textbox";
import Button from "@/app/components/Button";
export default function RegisterForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");

  // Password requirement checks
  const isLength = password.length >= 6;
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    if (!data.firstName || !data.lastName || !data.email || !data.password) {
      alert("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!isLength) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    if (!hasSymbol || !hasUppercase || !hasNumber) {
      alert(
        "Password must contain at least one symbol, one uppercase letter, and one number."
      );
      return;
    }
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed up successfully!
        const user = userCredential.user;
        console.log("User signed up:", user);
        alert("Registration successful!");
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Sign up error:", errorCode, errorMessage);
        // Display error message to the user
      });
  };

  return (
    <form
      className="flex flex-col border justify-center p-5 gap-3 rounded-2xl xs:w-2xs md:w-sm lg:w-md"
      onSubmit={handleSubmit}
    >
      {/* First Name Input */}
      <Label content="First Name" labelFor="firstNameInput" />
      <Textbox
        id="firstNameInput"
        type="text"
        placeholder="John, Mike..."
        name="firstName"
      />
      {/* Last Name Input */}
      <Label content="Last Name" labelFor="lastNameInput" />
      <Textbox
        id="lastNameInput"
        type="text"
        placeholder="Adam, Noah..."
        name="lastName"
      />
      {/* Email Input */}
      <Label content="Email" labelFor="emailInput" />
      <Textbox
        id="emailInput"
        type="email"
        placeholder="example@test.com"
        name="email"
      />
      {/* Password Input */}
      <Label content="Password" labelFor="passwordInput" />
      <Textbox
        id="passwordInput"
        type="password"
        placeholder="Choose a Strong Password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {/* Password Requirements */}
      <ul className="mb-2 ml-2 text-sm">
        <li className={isLength ? "text-green-500" : "text-red-500"}>
          At least 6 characters
        </li>
        <li className={hasSymbol ? "text-green-500" : "text-red-500"}>
          At least one symbol
        </li>
        <li className={hasUppercase ? "text-green-500" : "text-red-500"}>
          At least one uppercase letter
        </li>
        <li className={hasNumber ? "text-green-500" : "text-red-500"}>
          At least one number
        </li>
      </ul>
      <div className="flex flex-row gap-2 justify-between">
        <Button content="Register" type="submit" />
        <Button content="Cancel" type="button" to="/" />
      </div>
    </form>
  );
}
