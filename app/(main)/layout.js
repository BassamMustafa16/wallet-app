import NavBar from "./components/NavBar";
export default function RootLayout({ children }) {
  return (
    <body
      className={`antialiased lg:text-xl`}
    >
      <NavBar />
      {children}
    </body>
  );
}
