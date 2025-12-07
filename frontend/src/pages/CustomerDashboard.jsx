import { useEffect, useState } from "react";
import api from "../api/axios";

export default function CustomerDashboard() {
  const [products, setProducts] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
    fetchMyOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      alert("Failed to load products");
    }
  };

  const fetchMyOrders = async () => {
    try {
      const res = await api.get("/orders/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyOrders(res.data);
    } catch (err) {
      alert("Failed to load orders");
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Customer Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <button onClick={() => window.location.href = "/cart"}>Go to Cart</button>
      
      <h3>Products:</h3>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "180px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onClick={() => (window.location.href = `/product/${p._id}`)}
          >
            <img
              src={p.image}
              style={{
                width: "100%",
                height: "120px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />

            <h4>{p.name}</h4>
            <p>₹{p.price}</p>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: "30px" }}>My Orders:</h3>

      {myOrders.map((o) => (
        <div
          key={o._id}
          style={{
            border: "1px solid #aaa",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
            maxWidth: "350px",
          }}
        >
          <p><b>Order ID:</b> {o._id}</p>
          <p><b>Status:</b> {o.status}</p>
        </div>
      ))}
    </div>
  );
}
