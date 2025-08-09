import Navbar from "./components/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="pt-20 p-6 max-w-7xl mx-auto">{children}</main>
    </>
  );
}
