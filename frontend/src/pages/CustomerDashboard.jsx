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

//   return (
//     <div style={{ backgroundColor: "#F7F7F2", minHeight: "100vh" }}>
//       <Navbar />

//       <div className="container py-4" style={{ fontFamily: "Poppins" }}>

//         {/* TOP RIGHT BUTTON */}
//         <div className="d-flex justify-content-end gap-2 mb-3">
//           <div className="d-flex justify-content-end mb-3">

//             {/* PROFILE BUTTON */}
//             <button
//               className="btn"
//               style={{
//                 backgroundColor: "#8FAF9F",
//                 color: "white",
//                 borderRadius: "8px",
//                 padding: "8px 16px",
//                 letterSpacing: "0.5px",
//                 fontWeight: "500",
//               }}
//               onClick={() => (window.location.href = "/profile")}
//             >
//               ORDERS
//             </button>

//           </div>
//         </div>



//         {/* PRODUCTS SECTION */}
//         <h3 className="fw-semibold mb-3" style={{ color: "#8FAF9F" }}>
//           PRODUCTS
//         </h3>

//         <div className="row g-4">
//           {products.map((p) => (
//             <div className="col-6 col-md-4 col-lg-3" key={p._id}>
//               <div
//                 className="shadow-sm rounded p-2 bg-white h-100 d-flex flex-column"
//                 style={{
//                   borderLeft: "4px solid #8FAF9F",
//                 }}
//               >
//                 <img
//                   src={p.image}
//                   className="w-100 rounded"
//                   style={{ height: "150px", objectFit: "cover" }}
//                 />

//                 <h5 className="mt-2 fw-bold" style={{ color: "#8FAF9F" }}>
//                   {p.name}
//                 </h5>
//                 <p className="text-secondary mb-2">₹{p.price}</p>

//                 {/* VIEW DETAILS BUTTON */}
//                 <button
//                   className="btn mt-auto"
//                   onClick={() => (window.location.href = `/product/${p._id}`)}
//                   style={{
//                     backgroundColor: "#8FAF9F",
//                     color: "white",
//                     borderRadius: "8px",
//                     padding: "6px 12px",
//                     fontSize: "14px",
//                     fontWeight: "500",
//                   }}
//                 >
//                   VIEW DETAILS
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>

//       <Footer />
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

  return (
    <div
      style={{
        backgroundColor: "#F7F7F2",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      {/* MAIN CONTENT */}
      <div
        className="container py-4"
        style={{
          fontFamily: "Poppins",
          flex: 1, // ⭐ THIS MAKES FOOTER STICK TO BOTTOM
        }}
      >
        {/* TOP RIGHT BUTTON */}
        <div className="d-flex justify-content-end gap-2 mb-3">
          <button
            className="btn"
            style={{
              backgroundColor: "#8FAF9F",
              color: "white",
              borderRadius: "8px",
              padding: "8px 16px",
              letterSpacing: "0.5px",
              fontWeight: "500",
            }}
            onClick={() => (window.location.href = "/profile")}
          >
            ORDERS
          </button>
        </div>

        {/* PRODUCTS SECTION */}
        <h3 className="fw-semibold mb-3" style={{ color: "#8FAF9F" }}>
          PRODUCTS
        </h3>

        <div className="row g-4">
          {products.map((p) => (
            <div className="col-6 col-md-4 col-lg-3" key={p._id}>
              <div
                className="shadow-sm rounded p-2 bg-white h-100 d-flex flex-column"
                style={{
                  borderLeft: "4px solid #8FAF9F",
                }}
              >
                <img
                  src={p.image}
                  className="w-100 rounded"
                  style={{ height: "150px", objectFit: "cover" }}
                />

                <h5 className="mt-2 fw-bold" style={{ color: "#8FAF9F" }}>
                  {p.name}
                </h5>

                <p className="text-secondary mb-2">₹{p.price}</p>

                {/* VIEW DETAILS BUTTON */}
                <button
                  className="btn mt-auto"
                  onClick={() => (window.location.href = `/product/${p._id}`)}
                  style={{
                    backgroundColor: "#8FAF9F",
                    color: "white",
                    borderRadius: "8px",
                    padding: "6px 12px",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  VIEW DETAILS
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
