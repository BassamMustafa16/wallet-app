"use client";
import { AccountsProvider } from "./contexts/AccountsContext";
import NavBar from "./(components)/NavBar";
export default function RootLayout({ children }) {
  return (
    <main className={`lg:text-xl`}>
      <NavBar />
      <AccountsProvider>{children}</AccountsProvider>
    </main>
  );
}
