import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function OrderSuccess() {
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <Header />

      <main className="max-w-xl mx-auto px-6 py-24 text-center flex-1">
        <h1 className="text-2xl font-semibold mb-3">Order placed</h1>
        <p className="text-gray-500 mb-8">
          Your order has been received. A confirmation email will be sent shortly.
        </p>
        <Link
          to="/"
          className="inline-block bg-gray-900 text-white px-6 py-2.5 rounded text-sm hover:bg-gray-800"
        >
          Continue shopping
        </Link>
      </main>

      <Footer />
    </div>
  );
}
