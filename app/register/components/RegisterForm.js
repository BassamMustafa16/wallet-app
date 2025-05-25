"use client"
import Label from "@/app/components/Label";
import Textbox from "@/app/components/Textbox";
import Button from "@/app/components/Button";
export default function RegisterForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    alert(JSON.stringify(data));
  };
  return (
    <form
      className="flex flex-col border justify-center p-5 gap-3 rounded-2xl"
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
      />
      <div className="flex flex-row gap-2 justify-between">
        <Button content="Register" type="submit" />
        <Button content="Cancel" type="button" to="/"/>
      </div>
    </form>
  );
}
