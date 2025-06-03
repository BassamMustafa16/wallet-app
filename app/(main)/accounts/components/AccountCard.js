import { deleteAccount } from "../../(utils)/accountUtils";
import { useState } from "react";

export default function AccountCard({ account, setAccounts, userId }) {
  const [showDetails, setShowDetails] = useState(false);
  const handleDelete = async () => {
    if (
      confirm(
        `Are you sure you want to delete the account: ${account.accountName}?`
      )
    ) {
      try {
        await deleteAccount(account.id, userId);
        console.log(`Account deleted.`);
        // Refresh accounts list
        setAccounts((prev) => prev.filter((a) => a.id !== account.id));
      } catch (error) {
        console.error("Failed to delete account:", error);
      }
    }
  };
  return (
    <div className="border relative p-5 rounded-xl flex flex-col gap-2">
      <h3 className="text-lg font-bold">{account.accountName}</h3>
      <p>Initial Credit: ${account.initialCredit?.toFixed(2) ?? "0.00"}</p>
      <p>Balance: ${account.balance?.toFixed(2) ?? "0.00"}</p>
      <button
        className="border rounded-xl p-2"
        onClick={() => setShowDetails(!showDetails)}
      >
        {`${showDetails ? "Hide Details" : "Show Details"}`}
      </button>
      <div
        className={[
          "flex flex-col gap-2 overflow-hidden transition-all duration-400",
          showDetails ? "max-h-96" : "max-h-0",
        ].join(" ")}
      >
        <p>Total Expense: ${account.totalExpense?.toFixed(2) ?? "0.00"}</p>
        <p>Total Income: ${account.totalIncome?.toFixed(2) ?? "0.00"}</p>
        <p>
          Total Transfer Out: ${account.totalTransferOut?.toFixed(2) ?? "0.00"}
        </p>
        <p>
          Total Transfer In: ${account.totalTransferIn?.toFixed(2) ?? "0.00"}
        </p>
      </div>
      <div
        onClick={handleDelete}
        className="w-4 absolute top-5 right-5 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="#ededed"
        >
          <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
        </svg>
      </div>
    </div>
  );
}
