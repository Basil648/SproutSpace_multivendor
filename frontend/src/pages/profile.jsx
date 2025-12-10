import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CustomerProfile() {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.log("Order fetch failed:", err);
    }
  };

  return (
    <div style={{ backgroundColor: "#F7F7F2", minHeight: "100vh", fontFamily: "Poppins" }}>
      <Navbar />

      <div className="container py-4">

        <h2 className="fw-bold mb-4 text-center" style={{ color: "#8FAF9F" }}>
          MY ORDERS
        </h2>

        {orders.length === 0 ? (
          <p className="text-secondary">No orders placed yet.</p>
        ) : (
          <div className="row g-4">
            {orders.map((order) => (
              <div className="col-12" key={order._id}>
                <div
                  className="shadow-sm p-4 bg-white rounded"
                  style={{ borderLeft: "5px solid #8FAF9F" }}
                >
                  {/* Order header */}
                  <div className="d-flex justify-content-between mb-2">
                    <p><strong>Order ID:</strong> {order._id}</p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span style={{ color: "#8FAF9F" }}>{order.status}</span>
                    </p>
                  </div>

                  <p><strong>Total Amount:</strong> ₹{order.amount}</p>

                  <hr />

                  {/* Order Items */}
                  <h5 className="fw-semibold" style={{ color: "#8FAF9F" }}>
                    ITEMS IN ORDER
                  </h5>

                  <div className="mt-3">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="d-flex justify-content-between align-items-center p-3 mb-2 rounded"
                        style={{
                          backgroundColor: "#F2F5F3",
                          borderLeft: "4px solid #8FAF9F",
                        }}
                      >
                        <div>
                          <p className="fw-bold mb-1">{item.productId?.name}</p>
                          <p className="text-secondary mb-0">
                            ₹{item.productId?.price} × {item.quantity}
                          </p>
                        </div>

                        <div className="fw-bold text-success">
                          ₹{item.productId?.price * item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
