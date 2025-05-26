"use client";
import { useState } from "react";
import { db } from "@/app/lib/firebaseConfig"; // Make sure db is exported from your config
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {app} from "@/app/lib/firebaseConfig"; // Ensure auth is exported from your config

export default function AddAccountForm({ setShowAddAccountForm }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const accountName = formData.get("accountName");
    const initialCredit = parseFloat(formData.get("intialCredit"));

    // Get current user
    const auth = getAuth(app); // Ensure you are using the correct auth instance
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to add an account.");
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "accounts"), {
        accountName,
        initialCredit,
        totalExpense: 0,
        totalIncome: 0,
        totalTransferOut: 0,
        totalTransferIn: 0,
        balance: initialCredit,
        userId: user.uid,
      });
      alert("Account added!");
      setShowAddAccountForm(false);
    } catch (error) {
      alert("Error adding account: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 p-5 border rounded-xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      {/* Account name Input */}
      <label htmlFor="accountName">Account Name</label>
      <input
        type="text"
        id="accountName"
        name="accountName"
        placeholder="Enter account name"
        className="border p-2 rounded-lg"
        required
      />
      {/* Initial Credit Input */}
      <label htmlFor="intialCredit">Initial Credit</label>
      <input
        type="number"
        min={0}
        step="0.01"
        id="intialCredit"
        name="intialCredit"
        placeholder="Enter initial credit"
        required
        defaultValue={0}
        className="border p-2 rounded-lg"
      />
      <div className="flex flex-row justify-between gap-2">
        <button
          type="submit"
          className="border p-2 rounded-lg flex-1"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>
        <button
          type="button"
          onClick={() => setShowAddAccountForm(false)}
          className="border p-2 rounded-lg flex-1"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
