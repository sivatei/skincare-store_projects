import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useCart } from "../context/CartContext.jsx";

const emptyForm = {
  fullName: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  cardNumber: "",
};

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Enter your full name.";
    if (!form.email.trim()) {
      newErrors.email = "Enter your email.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email.";
    }
    if (!form.address.trim()) newErrors.address = "Enter your address.";
    if (!form.city.trim()) newErrors.city = "Enter your city.";
    if (!form.postalCode.trim())
      newErrors.postalCode = "Enter your postal code.";
    if (!/^\d{13,19}$/.test(form.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Enter a valid card number.";
    }
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      clearCart();
      navigate("/order-success");
    }
  }

  if (items.length === 0) {
    return (
      <div className="bg-white text-gray-900 min-h-screen flex flex-col">
        <Header />
        <main className="max-w-3xl mx-auto px-6 py-16 text-center flex-1">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <Link to="/" className="text-sm underline">
            Continue shopping
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-10 flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-10">
        <form onSubmit={handleSubmit} noValidate>
          <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

          <div className="space-y-4">
            <Field
              label="Full name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              error={errors.fullName}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />
            <Field
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              error={errors.address}
            />
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                error={errors.city}
              />
              <Field
                label="Postal code"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
                error={errors.postalCode}
              />
            </div>
            <Field
              label="Card number"
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleChange}
              error={errors.cardNumber}
              placeholder="1234 5678 9012 3456"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-gray-900 text-white py-2.5 rounded text-sm hover:bg-gray-800"
          >
            Place order
          </button>
        </form>

        <div>
          <h2 className="text-lg font-semibold mb-4">Order summary</h2>
          <div className="divide-y divide-gray-200 border-t border-b border-gray-200 mb-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-3 text-sm"
              >
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" />
                  <span>
                    {item.name}{" "}
                    <span className="text-gray-400">x{item.quantity}</span>
                  </span>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Field({ label, name, value, onChange, error, type = "text", placeholder }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm text-gray-600 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
          error
            ? "border-red-400 focus:ring-red-400"
            : "border-gray-300 focus:ring-gray-900"
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
