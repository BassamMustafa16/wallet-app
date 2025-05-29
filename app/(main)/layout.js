"use client";
import NavBar from "./(components)/NavBar";
export default function RootLayout({ children }) {
  return (
    <main className={`lg:text-xl`}>
      <NavBar />
      {children}
    </main>
  );
}
