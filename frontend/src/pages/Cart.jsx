// import { useEffect, useState } from "react";
// import api from "../api/axios";

// export default function Cart() {
//   const token = localStorage.getItem("token");
//   const [cart, setCart] = useState(null);

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const fetchCart = async () => {
//     const res = await api.get("/cart", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setCart(res.data);
//   };

//   const placeOrder = async () => {
//     const items = cart.items.map((i) => ({
//       productId: i.productId._id,
//       quantity: i.quantity,
//     }));

//     await api.post(
//       "/orders",
//       { items },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     alert("Order placed!");

//     await api.delete("/cart", {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     fetchCart();
//   };

//   if (!cart) return <p>Loading...</p>;

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Your Cart</h2>

//       {cart.items.length === 0 ? (
//         <p>Cart is empty.</p>
//       ) : (
//         <div>
//           {cart.items.map((item) => (
//             <div key={item.productId._id} style={{ marginBottom: "10px" }}>
//               <p>
//                 {item.productId.name} — ₹{item.productId.price}
//               </p>
//               <p>Qty: {item.quantity}</p>
//             </div>
//           ))}

//           <button onClick={() => window.location.href = "/checkout"}>
//             Proceed to Checkout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
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

  // ------- BACKEND-DRIVEN INCREMENT / DECREMENT -------
  const increaseQty = async (id) => {
    const res = await api.patch(
      "/cart/update",
      { productId: id, action: "inc" },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCart(res.data);
  };

  const decreaseQty = async (id) => {
    const res = await api.patch(
      "/cart/update",
      { productId: id, action: "dec" },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCart(res.data);
  };

  // ------- CALCULATE TOTAL -------
  const totalAmount =
    cart?.items.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    ) || 0;

  const goToCheckout = () => {
    navigate("/checkout", { state: { finalAmount: totalAmount } });
  };

  if (!cart) return <p>Loading...</p>;

  return (
    <div
      style={{
        backgroundColor: "#F7F7F2",
        minHeight: "100vh",
        padding: "35px",
        fontFamily: "Poppins",
      }}
    >
      <h2 className="fw-bold mb-4" style={{ color: "#8FAF9F" }}>
        YOUR CART
      </h2>

      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="row">

          {/* LEFT SIDE — CART ITEMS */}
          <div className="col-md-8">

            {cart.items.map((item) => (
              <div
                key={item.productId._id}
                className="shadow-sm p-3 mb-3 bg-white rounded d-flex justify-content-between align-items-center gap-3"
                style={{ borderLeft: "4px solid #8FAF9F" }}
              >
                {/* PRODUCT INFO */}
                <div>
                  <h5 className="fw-semibold" style={{ color: "#8FAF9F" }}>
                    {item.productId.name}
                  </h5>
                  <p className="text-secondary mb-1">
                    ₹{item.productId.price}
                  </p>

                  {/* QUANTITY CONTROLS */}
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-sm"
                      onClick={() => decreaseQty(item.productId._id)}
                      style={{
                        backgroundColor: "#8FAF9F",
                        color: "white",
                        borderRadius: "6px",
                      }}
                    >
                      -
                    </button>

                    <span className="fw-bold">{item.quantity}</span>

                    <button
                      className="btn btn-sm"
                      onClick={() => increaseQty(item.productId._id)}
                      style={{
                        backgroundColor: "#8FAF9F",
                        color: "white",
                        borderRadius: "6px",
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* TOTAL FOR THIS ITEM */}
                <div className="fw-bold fs-5">
                  ₹{item.productId.price * item.quantity}
                </div>
              </div>
            ))}

          </div>

          {/* RIGHT SIDE — ORDER SUMMARY */}
          <div className="col-md-4">
            <div
              className="shadow p-4 bg-white rounded"
              style={{
                borderLeft: "4px solid #8FAF9F",
                position: "sticky",
                top: "80px",
              }}
            >
              <h4 className="fw-bold" style={{ color: "#8FAF9F" }}>
                ORDER SUMMARY
              </h4>

              <div className="d-flex justify-content-between mt-3">
                <span className="fw-semibold">Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between">
                <h5>Total</h5>
                <h5 className="text-success">₹{totalAmount}</h5>
              </div>

              <button
                className="btn w-100 mt-3"
                style={{
                  backgroundColor: "#8FAF9F",
                  color: "white",
                  borderRadius: "10px",
                  letterSpacing: "1px",
                }}
                onClick={goToCheckout}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
