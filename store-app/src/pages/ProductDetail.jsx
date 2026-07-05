import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import products from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="bg-white text-gray-900 min-h-screen flex flex-col">
        <Header />
        <main className="max-w-6xl mx-auto px-6 py-16 text-center flex-1">
          <p className="text-gray-500 mb-4">Product not found.</p>
          <Link to="/" className="text-sm underline">
            Back to all products
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  function handleAddToCart() {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-10 flex-1 w-full">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500 hover:text-gray-900 mb-6"
        >
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <img src={product.image} alt={product.name} className="bg-gray-100 rounded-lg w-full h-80 md:h-96 object-cover" />

          <div>
            <span className="text-xs text-gray-400">{product.category}</span>
            <h1 className="text-2xl font-semibold mt-1 mb-2">{product.name}</h1>
            <p className="text-xl text-gray-800 mb-4">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm text-gray-600">Quantity</span>
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-sm hover:bg-gray-50"
                >
                  -
                </button>
                <span className="px-4 text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 text-sm hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full sm:w-auto bg-gray-900 text-white px-8 py-2.5 rounded text-sm hover:bg-gray-800"
            >
              {added ? "Added" : "Add to cart"}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
