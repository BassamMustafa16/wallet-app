import Label from "@/app/components/Label";
import Input from "@/app/components/Input";
import { useState, useEffect } from "react";
import { useData } from "../../contexts/AccountsContext";
export default function AddTransactionForm({ setShowAddTransactionForm }) {
  const { categories = [] } = useData();
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
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    alert(JSON.stringify(data));
  };
  return (
    <div className="fixed inset-0 p-5 bg-[#000000CC] flex items-center justify-center z-50">
      <form
        className="flex flex-col gap-2 border rounded-xl p-5 bg-inherit w-full"
        onSubmit={handleSubmit}
      >
        {/* Date Input */}
        <Label content="Date:" labelFor="dateInput"></Label>
        <div className="relative">
          <Input
            type="date"
            id="dateInput"
            name="dateInput"
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
          {/* Hide the native icon in Chrome */}
          <style jsx>{`
            input[type="date"]::-webkit-calendar-picker-indicator {
              opacity: 0;
              display: none;
            }
          `}</style>
        </div>

        {/* Category Input */}
        <Label content="Category:" labelFor="categoryInput"></Label>
        <select
          className="border rounded-xl p-2"
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

        {/* Subcategory Input */}
        <Label content="Subcategory:" labelFor="subcategoryInput"></Label>
        <select className="border rounded-xl p-2" name="subcategory">
          {subcategories.map((subcategory, index) => (
            <option key={index} className="text-black" value={subcategory}>
              {subcategory}
            </option>
          ))}
        </select>
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
