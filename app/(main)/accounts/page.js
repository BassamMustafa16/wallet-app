"use client";
import AddAccountForm from "./components/AddAccountForm";
import AccountCard from "./components/AccountCard";
import { useEffect, useState } from "react";
import { auth } from "@/app/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { fetchAccounts } from "@/app/(main)/(utils)/accountUtils";

export default function AccountsPage() {
  const [showAddAccountForm, setShowAddAccountForm] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); // <-- use state for user

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    setLoading(true); // set loading true before fetching
    fetchAccounts(user.uid).then((accounts) => {
      setAccounts(accounts);
      setLoading(false); // set loading false after fetching
    });
  }, [user]);

  if (user === null) {
    return (
      <div className="p-5">
        <p>Loading...</p>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="p-5">
        <p>Please sign in to view your accounts.</p>
      </div>
    );
  }

  return (
    <div className="p-5">
      {showAddAccountForm && (
        <AddAccountForm
          setShowAddAccountForm={setShowAddAccountForm}
          setAccounts={setAccounts}
        />
      )}
      {loading ? (
        <p>Loading accounts...</p>
      ) : accounts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {accounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              setAccounts={setAccounts}
            />
          ))}
        </div>
      ) : (
        <p>No accounts found. Please add an account.</p>
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
