import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [product, setProduct] = useState(null);
  const [inquiry, setInquiry] = useState(null); // FULL inquiry from DB
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProduct();
    fetchInquiry();
  }, []);

  // ---------- FETCH PRODUCT ----------
  const fetchProduct = async () => {
    const res = await api.get("/products");
    setProduct(res.data.find((p) => p._id === id));
  };

  // ---------- FETCH INQUIRY (SIMPLE) ----------
  const fetchInquiry = async () => {
    try {
      const res = await api.get("/inquiries/customer", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const found = res.data.find((i) => i.product._id === id);
      setInquiry(found || null);
    } catch (err) {
      console.log("Inquiry not found yet");
    }
  };

  // ---------- SEND MESSAGE ----------
  const sendMessage = async () => {
    if (!message.trim()) return alert("Type something");

    try {
      let res;

      // Create if not exists
      if (!inquiry) {
        res = await api.post(
          "/inquiries",
          { productId: id, message },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Reply if exists
        res = await api.post(
          "/inquiries/reply",
          { inquiryId: inquiry._id, message },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setInquiry(res.data); // update chat with fresh DB result
      setMessage("");
    } catch (e) {
      alert("Failed to send");
    }
  };

  const addToCart = async () => {
    try {
      await api.post(
        "/cart/add",
        { productId: id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Added to cart!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add to cart");
    }
  };


  if (!product) return <p>Loading…</p>;

  return (
    <div style={{ padding: "20px", display: "flex", gap: "40px" }}>

      {/* ---------------- LEFT SIDE ---------------- */}
      <div>
        <h2>{product.name}</h2>

        <img src={product.image} alt="" style={{ width: "300px" }} />

        <p><b>Price:</b> ₹{product.price}</p>
        <p><b>Description:</b> {product.description}</p>

        <button onClick={addToCart}>Add to Cart</button>

        <hr />

        <h3>Ask a Question</h3>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message…"
          style={{ width: "300px", height: "60px" }}
        />

        <br />
        <button onClick={sendMessage}>Send</button>
      </div>

      {/* ---------------- RIGHT SIDE — SIMPLE CHAT ---------------- */}
      <div
        style={{
          width: "260px",
          height: "380px",
          border: "1px solid #ccc",
          padding: "10px",
          overflowY: "auto",
        }}
      >
        <h4>Chat</h4>

        {!inquiry ? (
          <p style={{ color: "#777" }}>No messages yet.</p>
        ) : (
          inquiry.messages.map((msg, i) => (
            <div key={i} style={{ marginBottom: "15px" }}>
              {/* ✔ SIMPLE, SAFE: JUST SHOW TEXT */}
              <div
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  background: "#f0f0f0",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
