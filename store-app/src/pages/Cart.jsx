import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function Cart() {
  const { items, updateQuantity, removeItem, total } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-10 flex-1 w-full">
        <h1 className="text-2xl font-semibold mb-6">Your cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-sm mb-4">Your cart is empty.</p>
            <Link to="/" className="text-sm underline">
              Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-200 border-t border-b border-gray-200 mb-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 py-4"
                >
                  <img src={item.image} alt={item.name} className="bg-gray-100 rounded w-16 h-16 shrink-0 object-cover" />

                  <div className="flex-1">
                    <Link
                      to={`/product/${item.id}`}
                      className="font-medium hover:underline"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="px-2.5 py-1 text-sm hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="px-3 text-sm">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="px-2.5 py-1 text-sm hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>

                  <span className="w-16 text-right text-sm font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-gray-900 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mb-6">
              <Link to="/" className="text-sm underline text-gray-600">
                Continue shopping
              </Link>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-xl font-semibold">${total.toFixed(2)}</p>
              </div>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-gray-900 text-white py-2.5 rounded text-sm hover:bg-gray-800"
            >
              Checkout
            </button>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
