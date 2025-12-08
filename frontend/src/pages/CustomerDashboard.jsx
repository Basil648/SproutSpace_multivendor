// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";


// export default function CustomerDashboard() {
//   const [products, setProducts] = useState([]);
//   const [myOrders, setMyOrders] = useState([]);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchProducts();
//     fetchMyOrders();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await api.get("/products");
//       setProducts(res.data);
//     } catch (err) {
//       alert("Failed to load products");
//     }
//   };

//   const fetchMyOrders = async () => {
//     try {
//       const res = await api.get("/orders/my", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMyOrders(res.data);
//     } catch (err) {
//       alert("Failed to load orders");
//     }
//   };

//   const logout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Customer Dashboard</h2>
//       <button onClick={logout}>Logout</button>
//       <button onClick={() => window.location.href = "/cart"}>Go to Cart</button>

//       <h3>Products:</h3>

//       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//         {products.map((p) => (
//           <div
//             key={p._id}
//             style={{
//               border: "1px solid #ccc",
//               padding: "10px",
//               width: "180px",
//               borderRadius: "6px",
//               cursor: "pointer",
//             }}
//             onClick={() => (window.location.href = `/product/${p._id}`)}
//           >
//             <img
//               src={p.image}
//               style={{
//                 width: "100%",
//                 height: "120px",
//                 objectFit: "cover",
//                 borderRadius: "4px",
//               }}
//             />

//             <h4>{p.name}</h4>
//             <p>₹{p.price}</p>
//           </div>
//         ))}
//       </div>

//       <h3 style={{ marginTop: "30px" }}>My Orders:</h3>

//       {myOrders.map((o) => (
//         <div
//           key={o._id}
//           style={{
//             border: "1px solid #aaa",
//             padding: "10px",
//             marginBottom: "10px",
//             borderRadius: "6px",
//             maxWidth: "350px",
//           }}
//         >
//           <p><b>Order ID:</b> {o._id}</p>
//           <p><b>Status:</b> {o.status}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
    <div style={{ backgroundColor: "#F7F7F2", minHeight: "100vh" }}>
      <Navbar />

      <div className="container py-4">

        {/* PRODUCTS SECTION */}
        <h3 className="fw-semibold mb-3" style={{ color: "#8FAF9F" }}>PRODUCTS</h3>

        <div className="row g-4">
          {products.map((p) => (
            <div className="col-6 col-md-4 col-lg-3" key={p._id}>
              <div
                className="shadow-sm rounded p-2 bg-white h-100"
                style={{ cursor: "pointer" }}
                onClick={() => (window.location.href = `/product/${p._id}`)}
              >
                <img
                  src={p.image}
                  className="w-100 rounded"
                  style={{ height: "150px", objectFit: "cover" }}
                />

                <h5 className="mt-2 fw-bold" style={{ color: "#8FAF9F" }}>
                  {p.name}
                </h5>
                <p className="text-secondary">₹{p.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ORDERS SECTION */}
        <h3 className="fw-semibold mt-5 mb-3" style={{ color: "#8FAF9F" }}>MY ORDERS</h3>

        {myOrders.length === 0 && (
          <p className="text-secondary">No orders found.</p>
        )}

        <div className="row g-3">
          {myOrders.map((o) => (
            <div className="col-12 col-md-6 col-lg-4" key={o._id}>
              <div
                className="p-3 rounded shadow-sm bg-white"
                style={{ borderLeft: "4px solid #8FAF9F" }}
              >
                <p><b>Order ID:</b> {o._id}</p>
                <p><b>Status:</b> {o.status}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <Footer />
    </div>
  );
}
