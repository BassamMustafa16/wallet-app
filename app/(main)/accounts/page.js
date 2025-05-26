"use client";
import AddAccountForm from "./components/AddAccountForm";
import { useState } from "react";

export default function AccountsPage() {
  const [showAddAccountForm, setShowAddAccountForm] = useState(false);
  return (
    <div className="p-5">
      {showAddAccountForm && (
        <AddAccountForm setShowAddAccountForm={setShowAddAccountForm} />
      )}
      <button
        onClick={() => setShowAddAccountForm(!showAddAccountForm)}
        className="fixed bottom-10 right-5 border rounded-xl p-2 cursor-pointer"
      >
        Add Account
      </button>
    </div>
  );
}
