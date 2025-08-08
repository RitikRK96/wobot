import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="backdrop-blur-md bg-white/10 shadow-lg p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-orange-400 lg:ml-15">
        🍳 Recipe Book
      </Link>
      <div className="space-x-4">
        <Link
          to="/"
          className="text-white hover:text-orange-400 transition-colors lg:mr-15"
        >
          Home
        </Link>
      </div>
    </nav>
  );
}
