import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";

export default function Header({ search, onSearchChange }) {
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [localSearch, setLocalSearch] = useState(search ?? "");

  function handleSearchSubmit(e) {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(localSearch)}`);
  }

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="text-xl font-semibold shrink-0">
          GlowStore
        </Link>

        <nav className="hidden md:flex gap-8 text-sm text-gray-600 shrink-0">
          <Link to="/" className="hover:text-gray-900">
            All
          </Link>
          <Link to="/?category=Cleansers" className="hover:text-gray-900">
            Cleansers
          </Link>
          <Link to="/?category=Serums" className="hover:text-gray-900">
            Serums
          </Link>
          <Link to="/?category=Moisturizers" className="hover:text-gray-900">
            Moisturizers
          </Link>
          <Link to="/?category=Masks" className="hover:text-gray-900">
            Masks
          </Link>
        </nav>

        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Search"
            value={localSearch}
            onChange={(e) => {
              setLocalSearch(e.target.value);
              onSearchChange?.(e.target.value);
            }}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
          />
        </form>

        <Link
          to="/cart"
          className="relative border border-gray-300 rounded px-3 py-1.5 text-sm hover:bg-gray-50 shrink-0"
        >
          Cart
          <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        </Link>
      </div>
    </header>
  );
}
