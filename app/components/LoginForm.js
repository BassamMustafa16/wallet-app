"use client";
import Textbox from "./Textbox";
import Label from "./Label";
import Button from "./Button";
export default function LoginForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
  };
  return (
    <form
      className="flex flex-col border justify-center p-5 gap-3 rounded-2xl"
      onSubmit={handleSubmit}
    >
      <Label content="Email" labelFor="emailInput" />
      <Textbox
        id="emailInput"
        type="email"
        placeholder="Please enter your email"
        name="email"
      />
      <Label content="Password" labelFor="passwordInput" />
      <Textbox
        id="passwordInput"
        type="password"
        placeholder="Please enter your password"
        name="password"
      />
      <div className="flex flex-row justify-between gap-2">
        <Button content="Login" type="submit" />
        <Button content="Register" type="button" to="/register" />
      </div>
    </form>
  );
}
