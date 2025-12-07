// // import { useEffect, useState } from "react";
// // import api from "../api/axios";
// // import { useNavigate } from "react-router-dom";

// // export default function Billing() {
// //   const token = localStorage.getItem("token");
// //   const navigate = useNavigate();

// //   const [billing, setBilling] = useState({
// //     fullName: "",
// //     phone: "",
// //     address: "",
// //     city: "",
// //     state: "",
// //     postalCode: "",
// //     country: "India",
// //   });

// //   // new: which payment method user picks
// //   const [paymentMethod, setPaymentMethod] = useState("cod"); // "cod" or "online"

// //   useEffect(() => {
// //     loadBilling();
// //   }, []);

// //   const loadBilling = async () => {
// //     try {
// //       const res = await api.get("/billing", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       if (res.data) {
// //         setBilling(res.data);
// //       }
// //     } catch (err) {
// //       console.error("Load billing failed", err);
// //     }
// //   };

// //   const handleProceed = async () => {
// //     // Save billing details first
// //     await api.post("/billing", billing, {
// //       headers: { Authorization: `Bearer ${token}` },
// //     });

// //     if (paymentMethod === "cod") {
// //       // For COD: directly place order (you may call your order creation API here)
// //       navigate("/place-order-cod");  // or wherever you handle order placement with COD
// //     } else {
// //       // Online payment: redirect to payment page or start Stripe checkout
// //       navigate("/payment");  // or a dedicated payment route
// //     }
// //   };

// //   return (
// //     <div style={{ padding: "20px" }}>
// //       <h2>Billing Details</h2>

// //       <input
// //         placeholder="Full Name"
// //         value={billing.fullName}
// //         onChange={(e) =>
// //           setBilling({ ...billing, fullName: e.target.value })
// //         }
// //       />
// //       <input
// //         placeholder="Phone Number"
// //         value={billing.phone}
// //         onChange={(e) =>
// //           setBilling({ ...billing, phone: e.target.value })
// //         }
// //       />
// //       <input
// //         placeholder="Address"
// //         value={billing.address}
// //         onChange={(e) =>
// //           setBilling({ ...billing, address: e.target.value })
// //         }
// //       />
// //       <input
// //         placeholder="City"
// //         value={billing.city}
// //         onChange={(e) =>
// //           setBilling({ ...billing, city: e.target.value })
// //         }
// //       />
// //       <input
// //         placeholder="State"
// //         value={billing.state}
// //         onChange={(e) =>
// //           setBilling({ ...billing, state: e.target.value })
// //         }
// //       />
// //       <input
// //         placeholder="Postal Code"
// //         value={billing.postalCode}
// //         onChange={(e) =>
// //           setBilling({ ...billing, postalCode: e.target.value })
// //         }
// //       />

// //       <h3>Select Payment Method:</h3>
// //       <label>
// //         <input
// //           type="radio"
// //           value="cod"
// //           checked={paymentMethod === "cod"}
// //           onChange={() => setPaymentMethod("cod")}
// //         />
// //         Cash on Delivery (COD)
// //       </label>
// //       <br />
// //       <label>
// //         <input
// //           type="radio"
// //           value="online"
// //           checked={paymentMethod === "online"}
// //           onChange={() => setPaymentMethod("online")}
// //         />
// //         Online Payment
// //       </label>

// //       <br />
// //       <button onClick={handleProceed} style={{ marginTop: "20px" }}>
// //         {paymentMethod === "cod" ? "Place Order (COD)" : "Proceed to Payment"}
// //       </button>
// //     </div>
// //   );
// // }


// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";

// export default function Billing() {
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   const [billing, setBilling] = useState({
//     fullName: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     postalCode: "",
//     country: "India",
//   });

//   const [paymentMethod, setPaymentMethod] = useState("cod");
//   const [cart, setCart] = useState(null);

//   useEffect(() => {
//     loadBilling();
//     loadCart();
//   }, []);

//   // Load saved billing from DB
//   const loadBilling = async () => {
//     try {
//       const res = await api.get("/billing", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.data) setBilling(res.data);
//     } catch (err) {
//       console.log("Billing load failed");
//     }
//   };

//   // Fetch cart directly from backend (PROPER METHOD)
//   const loadCart = async () => {
//     try {
//       const res = await api.get("/cart", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCart(res.data);
//     } catch (err) {
//       console.log("Cart fetch failed");
//     }
//   };

//   // COD checkout (normal order creation)
//   const handleCOD = async () => {
//     const items = cart.items.map((i) => ({
//       productId: i.productId._id,
//       quantity: i.quantity,
//     }));

//     await api.post(
//       "/orders",
//       { items },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     // Clear cart
//     await api.delete("/cart", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     alert("Order placed with COD!");
//     navigate("/customer");
//   };

//   // Stripe Checkout
//   const handleOnlinePayment = async () => {
//     const items = cart.items.map((i) => ({
//       name: i.productId.name,
//       price: i.productId.price,
//       quantity: i.quantity,
//     }));

//     try {
//       const res = await api.post(
//         "/payment/create-checkout-session",
//         { items },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       window.location.href = res.data.url; // Redirect to Stripe
//     } catch (err) {
//       alert("Payment failed: " + (err.response?.data?.error || err.message));
//     }
//   };

//   const handleProceed = async () => {
//     // Save billing details first
//     await api.post("/billing", billing, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (paymentMethod === "cod") {
//       handleCOD();
//     } else {
//       handleOnlinePayment();
//     }
//   };

//   if (!cart) return <p>Loading…</p>;

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Billing Details</h2>

//       <input
//         placeholder="Full Name"
//         value={billing.fullName}
//         onChange={(e) =>
//           setBilling({ ...billing, fullName: e.target.value })
//         }
//       />

//       <input
//         placeholder="Phone Number"
//         value={billing.phone}
//         onChange={(e) =>
//           setBilling({ ...billing, phone: e.target.value })
//         }
//       />

//       <input
//         placeholder="Address"
//         value={billing.address}
//         onChange={(e) =>
//           setBilling({ ...billing, address: e.target.value })
//         }
//       />

//       <input
//         placeholder="City"
//         value={billing.city}
//         onChange={(e) =>
//           setBilling({ ...billing, city: e.target.value })
//         }
//       />

//       <input
//         placeholder="State"
//         value={billing.state}
//         onChange={(e) =>
//           setBilling({ ...billing, state: e.target.value })
//         }
//       />

//       <input
//         placeholder="Postal Code"
//         value={billing.postalCode}
//         onChange={(e) =>
//           setBilling({ ...billing, postalCode: e.target.value })
//         }
//       />

//       <h3>Select Payment Method</h3>

//       <label>
//         <input
//           type="radio"
//           checked={paymentMethod === "cod"}
//           value="cod"
//           onChange={(e) => setPaymentMethod(e.target.value)}
//         />
//         Cash on Delivery
//       </label>

//       <br />

//       <label>
//         <input
//           type="radio"
//           checked={paymentMethod === "online"}
//           value="online"
//           onChange={(e) => setPaymentMethod(e.target.value)}
//         />
//         Pay Online (Stripe)
//       </label>

//       <br />

//       <button style={{ marginTop: "20px" }} onClick={handleProceed}>
//         {paymentMethod === "cod" ? "Place Order" : "Proceed to Payment"}
//       </button>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Billing() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [billing, setBilling] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cart, setCart] = useState(null);

  useEffect(() => {
    loadBilling();
    loadCart();
  }, []);

  // LOAD BILLING DETAILS
  const loadBilling = async () => {
    try {
      const res = await api.get("/billing", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data) setBilling(res.data);
    } catch (err) {
      console.log("Billing load failed:", err);
    }
  };

  // LOAD CART FROM BACKEND (PROPER WAY)
  const loadCart = async () => {
    try {
      const res = await api.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch (err) {
      console.log("Cart fetch failed:", err);
    }
  };

  // CALCULATE TOTAL
  const totalAmount = cart
    ? cart.items.reduce(
        (total, item) => total + item.productId.price * item.quantity,
        0
      )
    : 0;

  // COD PLACE ORDER
  const handleCOD = async () => {
    const items = cart.items.map((i) => ({
      productId: i.productId._id,
      quantity: i.quantity,
    }));

    await api.post(
      "/orders",
      { items },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    await api.delete("/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("Order placed with COD!");
    navigate("/customer");
  };

  // STRIPE PAYMENT
  const handleOnlinePayment = async () => {
    const items = cart.items.map((i) => ({
      name: i.productId.name,
      price: i.productId.price,
      quantity: i.quantity,
    }));

    try {
      const res = await api.post(
        "/payment/create-checkout-session",
        { items },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.href = res.data.url; // Redirect to Stripe
    } catch (err) {
      alert("Payment failed: " + (err.response?.data?.error || err.message));
    }
  };

  const handleProceed = async () => {
    await api.post("/billing", billing, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (paymentMethod === "cod") handleCOD();
    else handleOnlinePayment();
  };

  if (!cart) return <p>Loading…</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Billing Details</h2>

      {/* BILLING FORM */}
      <input
        placeholder="Full Name"
        value={billing.fullName}
        onChange={(e) =>
          setBilling({ ...billing, fullName: e.target.value })
        }
      />
      <input
        placeholder="Phone Number"
        value={billing.phone}
        onChange={(e) =>
          setBilling({ ...billing, phone: e.target.value })
        }
      />
      <input
        placeholder="Address"
        value={billing.address}
        onChange={(e) =>
          setBilling({ ...billing, address: e.target.value })
        }
      />
      <input
        placeholder="City"
        value={billing.city}
        onChange={(e) =>
          setBilling({ ...billing, city: e.target.value })
        }
      />
      <input
        placeholder="State"
        value={billing.state}
        onChange={(e) =>
          setBilling({ ...billing, state: e.target.value })
        }
      />
      <input
        placeholder="Postal Code"
        value={billing.postalCode}
        onChange={(e) =>
          setBilling({ ...billing, postalCode: e.target.value })
        }
      />

      <hr />

      {/* CART SUMMARY SECTION */}
      <h3>Your Order Summary</h3>

      {cart.items.map((item) => (
        <div
          key={item.productId._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
            maxWidth: "350px",
          }}
        >
          <p>
            <b>{item.productId.name}</b>
          </p>
          <p>
            ₹{item.productId.price} × {item.quantity}
          </p>
          <p>
            <b>Subtotal:</b> ₹{item.productId.price * item.quantity}
          </p>
        </div>
      ))}

      <h2>Total Amount: ₹{totalAmount}</h2>

      <hr />

      {/* PAYMENT OPTIONS */}
      <h3>Select Payment Method</h3>

      <label>
        <input
          type="radio"
          checked={paymentMethod === "cod"}
          value="cod"
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        Cash on Delivery
      </label>

      <br />

      <label>
        <input
          type="radio"
          checked={paymentMethod === "online"}
          value="online"
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        Pay Online (Stripe)
      </label>

      <br />

      <button style={{ marginTop: "20px" }} onClick={handleProceed}>
        {paymentMethod === "cod"
          ? "Place Order"
          : "Proceed to Online Payment"}
      </button>
    </div>
  );
}
