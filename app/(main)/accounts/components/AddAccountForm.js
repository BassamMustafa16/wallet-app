"use client";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "@/app/lib/firebaseConfig";
import { fetchAccounts } from "@/app/(main)/(utils)/fetchAccounts";

export default function AddAccountForm({ setShowAddAccountForm, setAccounts }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const accountName = formData.get("accountName");
    const initialCredit = parseFloat(formData.get("intialCredit"));

    // Get current user
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
        uid: user.uid,
      });
      alert("Account added!");
      setShowAddAccountForm(false);
      fetchAccounts(user.uid).then(setAccounts);
    } catch (error) {
      alert("Error adding account: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#000000CC] flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 p-5 border rounded-xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black"
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
    </div>
  );
}
