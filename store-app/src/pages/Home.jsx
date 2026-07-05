import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import products from "../data/products.js";


const categories = ["All", "Cleansers", "Serums", "Moisturizers", "Masks"];

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();


  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "All";
  const sort = searchParams.get("sort") || "default";

  const [searchInput, setSearchInput] = useState(search);

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value && value !== "All" && value !== "default") {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setSearchParams(next);
  }

  const filteredProducts = useMemo(() => {
    let result = products;

    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    if (search.trim()) {
      const term = search.trim().toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(term));
    }

    if (sort === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [category, search, sort]);

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <Header search={searchInput} onSearchChange={setSearchInput} />

      <section className="max-w-6xl mx-auto px-6 py-10 w-full">
        <div className="relative rounded-lg overflow-hidden h-64 sm:h-80 flex items-center justify-center">
          <img 
            src="https://stylepatisserie.com/cdn/shop/files/madara-web_banner-still-b-0326.jpg?v=1774480614&width=3840" 
            alt="Banner" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-6 text-center text-white">
            <h1 className="text-4xl sm:text-5xl font-semibold mb-3 shadow-sm">Glowing Skin Essentials</h1>
            <p className="text-lg sm:text-xl max-w-xl shadow-sm">Nourish your skin. Radiant results.</p>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 pb-16 w-full flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => updateParam("category", cat)}
                className={`text-sm px-3 py-1.5 rounded border ${
                  category === cat
                    ? "bg-gray-900 text-white border-gray-900"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <select
            value={sort}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
          >
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: Low to high</option>
            <option value="price-desc">Price: High to low</option>
          </select>
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-gray-400 text-sm py-16 text-center">
            No products match your search.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 rounded-lg p-4 flex flex-col"
              >
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} className="bg-gray-100 rounded h-48 w-full object-cover mb-3" />
                </Link>
                <span className="text-xs text-gray-400 mb-1">
                  {product.category}
                </span>
                <Link
                  to={`/product/${product.id}`}
                  className="font-medium mb-1 hover:underline"
                >
                  {product.name}
                </Link>
                <span className="text-gray-600 mb-3">
                  ${product.price.toFixed(2)}
                </span>
                <Link
                  to={`/product/${product.id}`}
                  className="mt-auto border border-gray-900 text-gray-900 text-sm py-1.5 rounded hover:bg-gray-900 hover:text-white transition text-center block"
                >
                  View Detail
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
