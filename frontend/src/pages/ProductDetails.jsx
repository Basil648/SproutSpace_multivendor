// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api/axios";

// export default function ProductDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [product, setProduct] = useState(null);
//   const [inquiry, setInquiry] = useState(null); // FULL inquiry from DB
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     fetchProduct();
//     fetchInquiry();
//   }, []);

//   // ---------- FETCH PRODUCT ----------
//   const fetchProduct = async () => {
//     const res = await api.get("/products");
//     setProduct(res.data.find((p) => p._id === id));
//   };

//   // ---------- FETCH INQUIRY (SIMPLE) ----------
//   const fetchInquiry = async () => {
//     try {
//       const res = await api.get("/inquiries/customer", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const found = res.data.find((i) => i.product._id === id);
//       setInquiry(found || null);
//     } catch (err) {
//       console.log("Inquiry not found yet");
//     }
//   };

//   // ---------- SEND MESSAGE ----------
//   const sendMessage = async () => {
//     if (!message.trim()) return alert("Type something");

//     try {
//       let res;

//       // Create if not exists
//       if (!inquiry) {
//         res = await api.post(
//           "/inquiries",
//           { productId: id, message },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       } else {
//         // Reply if exists
//         res = await api.post(
//           "/inquiries/reply",
//           { inquiryId: inquiry._id, message },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       }

//       setInquiry(res.data); // update chat with fresh DB result
//       setMessage("");
//     } catch (e) {
//       alert("Failed to send");
//     }
//   };

//   const addToCart = async () => {
//     try {
//       await api.post(
//         "/cart/add",
//         { productId: id, quantity: 1 },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert("Added to cart!");
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to add to cart");
//     }
//   };


//   if (!product) return <p>Loading…</p>;

//   return (
//     <div style={{ padding: "20px", display: "flex", gap: "40px" }}>

//       {/* ---------------- LEFT SIDE ---------------- */}
//       <div>
//         <h2>{product.name}</h2>

//         <img src={product.image} alt="" style={{ width: "300px" }} />

//         <p><b>Price:</b> ₹{product.price}</p>
//         <p><b>Description:</b> {product.description}</p>

//         <button onClick={addToCart}>Add to Cart</button>

//         <hr />

//         <h3>Ask a Question</h3>
//         <textarea
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type your message…"
//           style={{ width: "300px", height: "60px" }}
//         />

//         <br />
//         <button onClick={sendMessage}>Send</button>
//       </div>

//       {/* ---------------- RIGHT SIDE — SIMPLE CHAT ---------------- */}
//       <div
//         style={{
//           width: "260px",
//           height: "380px",
//           border: "1px solid #ccc",
//           padding: "10px",
//           overflowY: "auto",
//         }}
//       >
//         <h4>Chat</h4>

//         {!inquiry ? (
//           <p style={{ color: "#777" }}>No messages yet.</p>
//         ) : (
//           inquiry.messages.map((msg, i) => (
//             <div key={i} style={{ marginBottom: "15px" }}>
//               {/* ✔ SIMPLE, SAFE: JUST SHOW TEXT */}
//               <div
//                 style={{
//                   padding: "8px",
//                   borderRadius: "6px",
//                   background: "#f0f0f0",
//                 }}
//               >
//                 {msg.text}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiMessageCircle } from "react-icons/fi";
import "../styles/chat.css";

export default function ProductDetails() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [product, setProduct] = useState(null);
  const [inquiry, setInquiry] = useState(null);
  const [message, setMessage] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    fetchProduct();
    fetchInquiry();
  }, []);

  const fetchProduct = async () => {
    const res = await api.get("/products");
    setProduct(res.data.find((p) => p._id === id));
  };

  const fetchInquiry = async () => {
    try {
      const res = await api.get("/inquiries/customer", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const found = res.data.find((i) => i.product._id === id);
      setInquiry(found || null);
    } catch (err) {
      console.log("Inquiry not found");
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return alert("Type something");

    try {
      let res;

      if (!inquiry) {
        res = await api.post(
          "/inquiries",
          { productId: id, message },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        res = await api.post(
          "/inquiries/reply",
          { inquiryId: inquiry._id, message },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setInquiry(res.data);
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
      alert("Failed to add to cart");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ backgroundColor: "#F7F7F2", minHeight: "100vh" }}>
      <Navbar />

      <div className="container py-4">

        <h2 className="fw-bold mb-4" style={{ color: "#8FAF9F" }}>
          {product.name}
        </h2>

        {/* ------------ FLEX WRAPPER (70:30) ------------ */}
        <div className="product-chat-wrapper">

          {/* PRODUCT AREA */}
          <div
            className="product-area"
            style={{ width: chatOpen ? "70%" : "100%" }}
          >
            <div className="d-flex gap-4 flex-wrap">

              {/* IMAGE */}
              <img
                src={product.image}
                className="rounded shadow"
                style={{
                  width: "350px",
                  height: "350px",
                  objectFit: "cover"
                }}
              />

              {/* DETAILS */}
              <div className="d-flex flex-column justify-content-center">
                <p className="fs-5">
                  <b>Price:</b>{" "}
                  <span className="text-success fw-bold">₹{product.price}</span>
                </p>

                <p className="text-secondary" style={{ maxWidth: "350px" }}>
                  {product.description}
                </p>

                <button
                  className="btn mt-3"
                  onClick={addToCart}
                  style={{
                    backgroundColor: "#8FAF9F",
                    color: "white",
                    padding: "10px 25px",
                    borderRadius: "8px",
                    letterSpacing: "1px"
                  }}
                >
                  ADD TO CART
                </button>
              </div>

            </div>
          </div>

          {/* CHAT SIDE PANEL */}
          <div className={`chat-box ${chatOpen ? "open" : "closed"}`}>
            {chatOpen && (
              <>
                <h4 className="fw-bold text-center" style={{ color: "#8FAF9F" }}>
                  CHAT
                </h4>

                {/* Messages */}
                <div className="chat-messages">
                  {!inquiry ? (
                    <p className="text-secondary text-center">No messages yet.</p>
                  ) : (
                    inquiry.messages.map((msg, i) => (
                      <div key={i} className="mb-3">
                        <div
                          style={{
                            padding: "10px",
                            background: "#f1f1f1",
                            borderRadius: "8px"
                          }}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Input fixed at bottom */}
                <div className="chat-input-area">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="form-control"
                    style={{
                      borderRadius: "10px",
                      resize: "none",
                      height: "70px"
                    }}
                  />

                  <button
                    onClick={sendMessage}
                    className="btn w-100 mt-2"
                    style={{
                      backgroundColor: "#8FAF9F",
                      color: "white",
                      borderRadius: "8px",
                      letterSpacing: "1px"
                    }}
                  >
                    SEND
                  </button>
                </div>
              </>
            )}
          </div>

        </div>

        {/* FLOATING CHAT BUTTON */}
        <div
          className="floating-chat-btn"
          onClick={() => setChatOpen(!chatOpen)}
        >
          <FiMessageCircle />
        </div>

      </div>

      <Footer />
    </div>
  );
}
