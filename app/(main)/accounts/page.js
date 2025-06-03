"use client";
import AddAccountForm from "./components/AddAccountForm";
import AccountCard from "./components/AccountCard";
import { useState } from "react";

import { useData } from "@/app/(main)/contexts/AccountsContext";

export default function AccountsPage() {
  const [showAddAccountForm, setShowAddAccountForm] = useState(false);
  const { accounts, setAccounts, loading, user } = useData();

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
              userId={user.uid}
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
