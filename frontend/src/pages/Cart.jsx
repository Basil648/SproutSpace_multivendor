import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Cart() {
  const token = localStorage.getItem("token");
  const [cart, setCart] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const res = await api.get("/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCart(res.data);
  };

  const placeOrder = async () => {
    const items = cart.items.map((i) => ({
      productId: i.productId._id,
      quantity: i.quantity,
    }));

    await api.post(
      "/orders",
      { items },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Order placed!");

    await api.delete("/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchCart();
  };

  if (!cart) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>

      {cart.items.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <div>
          {cart.items.map((item) => (
            <div key={item.productId._id} style={{ marginBottom: "10px" }}>
              <p>
                {item.productId.name} — ₹{item.productId.price}
              </p>
              <p>Qty: {item.quantity}</p>
            </div>
          ))}

          <button onClick={() => window.location.href = "/checkout"}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
