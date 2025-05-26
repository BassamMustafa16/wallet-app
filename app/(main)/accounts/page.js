"use client";
import AddAccountForm from "./components/AddAccountForm";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "@/app/lib/firebaseConfig";
import { fetchAccounts } from "@/app/(main)/(utils)/fetchAccounts";

export default function AccountsPage() {
  const [showAddAccountForm, setShowAddAccountForm] = useState(false);
  const [accounts, setAccounts] = useState([]);

  const user = auth.currentUser;
  useEffect(() => {
    if (!user) return;

    fetchAccounts(user.uid).then(setAccounts);
  }, [user]);

  return (
    <div className="p-5">
      {showAddAccountForm && (
        <AddAccountForm setShowAddAccountForm={setShowAddAccountForm} setAccounts={setAccounts}/>
      )}
      {accounts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="border p-5 rounded-xl flex flex-col gap-2"
            >
              <h3 className="text-lg font-bold">{account.accountName}</h3>
              <p>
                Initial Credit: ${account.initialCredit?.toFixed(2) ?? "0.00"}
              </p>
              <p>
                Total Expense: ${account.totalExpense?.toFixed(2) ?? "0.00"}
              </p>
              <p>Total Income: ${account.totalIncome?.toFixed(2) ?? "0.00"}</p>
              <p>
                Total Transfer Out: $
                {account.totalTransferOut?.toFixed(2) ?? "0.00"}
              </p>
              <p>
                Total Transfer In: $
                {account.totalTransferIn?.toFixed(2) ?? "0.00"}
              </p>
              <p>Balance: ${account.balance?.toFixed(2) ?? "0.00"}</p>
            </div>
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
