"use client";
import React, { useState, useEffect } from "react";
import TransactionCard from "./(components)/TransactionCard";
import AddTransactionForm from "./(components)/AddTransaction";
export default function TransactionsPage() {
  const [showAddTransactionForm, setShowAddTransactionForm] = useState(false);

  return (
    <div className="p-5">
      {showAddTransactionForm && (
        <AddTransactionForm
          setShowAddTransactionForm={setShowAddTransactionForm}
        />
      )}
      <TransactionCard />
      <button
        className="border rounded-2xl p-2 absolute bottom-10 right-5"
        onClick={() => setShowAddTransactionForm(!showAddTransactionForm)}
      >
        Add
      </button>
    </div>
  );
}
