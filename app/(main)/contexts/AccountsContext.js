"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "@/app/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const AccountsContext = createContext();

export function AccountsProvider({ children }) {
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setAccounts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const fetchAccounts = async () => {
      try {
        const accountsRef = collection(db, "users", user.uid, "accounts");
        const snapshot = await getDocs(accountsRef);
        const accountsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAccounts(accountsData);
      } catch (error) {
        console.error("Error fetching accounts:", error);
        setAccounts([]);
      } finally {
        setLoading(false);
      }
    };
    const fetchCategories = async () => {
      try {
        const categoriesRef = collection(db, "users", user.uid, "categories");
        const snapshot = await getDocs(categoriesRef);
        const categoriesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
    fetchCategories();
  }, [user]);

  return (
    <AccountsContext.Provider
      value={{ accounts, setAccounts, categories, loading, user }}
    >
      {children}
    </AccountsContext.Provider>
  );
}

export function useData() {
  return useContext(AccountsContext);
}
