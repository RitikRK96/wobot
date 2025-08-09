import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 backdrop-blur-md bg-white/10 shadow-lg z-50">
      {/* Container to align content with layout */}
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        <Link to="/" className="text-2xl font-bold text-orange-400">
          🍳 Recipe Book
        </Link>
        <div className="space-x-4">
          <Link
            to="/"
            className="text-white hover:text-orange-400 transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
}
