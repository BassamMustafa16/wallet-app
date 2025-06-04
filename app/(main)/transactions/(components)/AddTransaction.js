"use client"
import Label from "@/app/components/Label";
import Input from "@/app/components/Input";
import { useState, useEffect } from "react";
import { useData } from "../../contexts/AccountsContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebaseConfig";
export default function AddTransactionForm({ setShowAddTransactionForm }) {
  const { categories = [], labels = [], user } = useData();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  // Set default selected category when categories load
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].categoryName);
    }
  }, [categories, selectedCategory]);

  useEffect(() => {
    const filteredCategory = categories.find(
      (category) => category.categoryName === selectedCategory
    );
    setSubcategories(filteredCategory?.subCategories || []);
  }, [selectedCategory, categories]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    try {
      const docRef = await addDoc(collection(db, "users", user.uid, "transactions"), {
        date: data.date,
        category: data.category,
        subcategory: data.subcategory,
        type: data.type,
        label: data.label,
        amount: parseFloat(data.amount),
        payee: data.payee,
        description: data.description,
      });
      alert("Transaction added!");
      setShowAddTransactionForm(false);
      // setAccounts((prev) => [
      //   ...prev,
      //   {
      //     id: docRef.id,
      //     accountName,
      //     initialCredit,
      //     totalExpense: 0,
      //     totalIncome: 0,
      //     totalTransferOut: 0,
      //     totalTransferIn: 0,
      //     balance: initialCredit,
      //     uid: user.uid,
      //   },
      // ]);
    } catch (error) {
      alert("Error adding Transaction: " + error.message);
    } finally {
      // setLoading(false);
    }

  };
  return (
    <div className="fixed inset-0 p-5 bg-[#000000CC] flex items-center justify-center z-50">
      <form
        className="flex flex-col gap-2 border rounded-xl p-5 bg-inherit w-full max-h-3/4 overflow-scroll"
        onSubmit={handleSubmit}
      >
        {/* Date Input */}
        <Label content="Date:" labelFor="dateInput"></Label>
        <div className="relative">
          <Input
            type="date"
            id="dateInput"
            name="date"
            defaultValue={new Date().toISOString().slice(0, 10)}
            className="pr-10" // add padding for the icon
            style={{
              colorScheme: "light", // optional: ensures consistent icon bg in dark mode
            }}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {/* Custom calendar SVG, change fill/stroke for color */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-inherit"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" />
              <path strokeWidth="2" d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </span>
        </div>

        {/* Category Input */}
        <Label content="Category:" labelFor="categoryInput"></Label>
        <div className="relative">
          <select
            className="border rounded-xl p-2 pr-10 appearance-none w-full"
            name="category"
            value={selectedCategory || ""}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option
                key={category.id}
                className="text-black"
                value={category.categoryName}
              >
                {category.categoryName}
              </option>
            ))}
          </select>
          <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            {/* Custom arrow SVG */}
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-gray-400"
            >
              <path
                d="M6 9l6 6 6-6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        {/* Subcategory Input */}
        <Label content="Subcategory:" labelFor="subcategoryInput"></Label>
        <div className="relative">
          <select
            className="border rounded-xl p-2 pr-10 appearance-none w-full"
            name="subcategory"
          >
            {subcategories.map((subcategory, index) => (
              <option key={index} className="text-black" value={subcategory}>
                {subcategory}
              </option>
            ))}
          </select>
          <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            {/* Custom arrow SVG */}
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-gray-400"
            >
              <path
                d="M6 9l6 6 6-6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        {/* Type Input */}
        <Label content="Expense/Income:" labelFor="typeInput"></Label>
        <div className="relative">
          <select
            className="border rounded-xl p-2 pr-10 appearance-none w-full"
            name="type"
          >
            <option className="text-black" value="expense">
              Expense
            </option>
            <option className="text-black" value="income">
              Income
            </option>
          </select>
          <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            {/* Custom arrow SVG */}
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-gray-400"
            >
              <path
                d="M6 9l6 6 6-6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        {/* Labels Input */}
        <Label content="Label:" labelFor="labelInput"></Label>
        <div className="relative">
          <select
            className="border rounded-xl p-2 pr-10 appearance-none w-full"
            name="label"
          >
            {labels.map((label, index) => (
              <option key={index} className="text-black" value={label.name}>
                {label.name}
              </option>
            ))}
          </select>
          <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            {/* Custom arrow SVG */}
            <svg
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-gray-400"
            >
              <path
                d="M6 9l6 6 6-6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        {/* Amout Input */}
        <Label content="Amount:" labelFor="amountInput"></Label>
        <Input
          id="amountInput"
          placeholder={0}
          type="number"
          min={0}
          step={0.01}
          name="amount"
        />
        {/* Payee Input */}
        <Label content="Payee:" labelFor="payeeInput"></Label>
        <Input id="payeeInput" type="text" name="payee" required={false} />

        {/* Description Input */}
        <Label content="Description:" labelFor="descriptionInput"></Label>
        <Input id="descriptionInput" name="description" required={false} />

        <div className="flex flex-row gap-2 justify-between">
          <button className="border rounded-2xl p-2 flex-1" type="submit">
            Add
          </button>
          <button
            type="button"
            className="border rounded-2xl p-2 flex-1"
            onClick={() => setShowAddTransactionForm(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
