// import { useEffect, useState } from "react";
// import api from "../api/axios";
// import VendorInquiries from "./VendorInquiries";

// export default function VendorDashboard() {
//   const token = localStorage.getItem("token");

//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]);

//   const [page, setPage] = useState("products"); // 👈 NEW: page handling

//   // Add product form
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     description: "",
//     price: "",
//     stock: "",
//   });

//   const [file, setFile] = useState(null);

//   useEffect(() => {
//     fetchProducts();
//     fetchOrders();
//   }, []);

//   // GET vendor products
//   const fetchProducts = async () => {
//     const res = await api.get("/products/my", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setProducts(res.data);
//   };

//   // GET vendor orders
//   const fetchOrders = async () => {
//     const res = await api.get("/orders/vendor", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setOrders(res.data);
//   };

//   // ADD PRODUCT
//   const handleAddProduct = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       alert("Please select an image");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", newProduct.name);
//     formData.append("description", newProduct.description);
//     formData.append("price", newProduct.price);
//     formData.append("stock", newProduct.stock);
//     formData.append("image", file);

//     try {
//       await api.post("/products", formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       alert("Product added!");
//       fetchProducts();
//     } catch (err) {
//       alert(err.response?.data?.message || "Add product failed");
//     }
//   };

//   // DELETE PRODUCT
//   const deleteProduct = async (id) => {
//     try {
//       await api.delete(`/products/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       alert("Product deleted!");
//       fetchProducts();
//     } catch (err) {
//       alert("Delete failed");
//     }
//   };

//   const logout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   return (
//     <div style={{ display: "flex", minHeight: "100vh" }}>
//       {/* SIDEBAR */}
//       <div
//         style={{
//           width: "220px",
//           background: "#f0f0f0",
//           padding: "20px",
//           borderRight: "1px solid #ccc",
//         }}
//       >
//         <h3>Vendor Panel</h3>

//         <p style={{ cursor: "pointer" }} onClick={() => setPage("products")}>
//           My Products
//         </p>

//         <p style={{ cursor: "pointer" }} onClick={() => setPage("add")}>
//           Add Product
//         </p>

//         <p style={{ cursor: "pointer" }} onClick={() => setPage("orders")}>
//           Orders
//         </p>

//         <p style={{ cursor: "pointer" }} onClick={() => setPage("inquiries")}>
//           Enquiries
//         </p>

//         <p
//           style={{
//             cursor: "pointer",
//             color: "red",
//             marginTop: "20px",
//             fontWeight: "bold",
//           }}
//           onClick={logout}
//         >
//           Logout
//         </p>
//       </div>

//       {/* MAIN CONTENT */}
//       <div style={{ flexGrow: 1, padding: "20px" }}>

//         {/* ==== PRODUCTS PAGE ==== */}
//         {page === "products" && (
//           <div>
//             <h2>My Products</h2>

//             <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//               {products.map((p) => (
//                 <div
//                   key={p._id}
//                   style={{
//                     border: "1px solid #ccc",
//                     padding: "10px",
//                     width: "180px",
//                   }}
//                 >
//                   <img
//                     src={p.image}
//                     style={{
//                       width: "100%",
//                       height: "120px",
//                       objectFit: "cover",
//                     }}
//                   />

//                   <h4>{p.name}</h4>
//                   <p>₹{p.price}</p>
//                   <button onClick={() => deleteProduct(p._id)}>Delete</button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* ==== ADD PRODUCT PAGE ==== */}
//         {page === "add" && (
//           <div>
//             <h2>Add Product</h2>

//             <form onSubmit={handleAddProduct}>
//               <input
//                 placeholder="Name"
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, name: e.target.value })
//                 }
//               />
//               <input
//                 placeholder="Description"
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, description: e.target.value })
//                 }
//               />
//               <input
//                 placeholder="Price"
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, price: e.target.value })
//                 }
//               />
//               <input
//                 placeholder="Stock"
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, stock: e.target.value })
//                 }
//               />

//               <input type="file" onChange={(e) => setFile(e.target.files[0])} />

//               <button type="submit">Add Product</button>
//             </form>
//           </div>
//         )}

//         {/* ==== ORDERS PAGE ==== */}
//         {page === "orders" && (
//           <div>
//             <h2>Orders for You</h2>

//             {orders.map((o) => (
//               <div
//                 key={o._id}
//                 style={{
//                   border: "1px solid #aaa",
//                   padding: "10px",
//                   marginBottom: "10px",
//                   borderRadius: "6px",
//                   maxWidth: "350px",
//                 }}
//               >
//                 <p><b>Order ID:</b> {o._id}</p>
//                 <p><b>Status:</b> {o.status}</p>

//                 <p><b>Items:</b></p>
//                 {o.items.map((i) => (
//                   <div key={i._id}>
//                     <p>{i.productId?.name} (x{i.quantity})</p>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* ==== ENQUIRIES PAGE ==== */}
//         {page === "inquiries" && <VendorInquiries />}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import api from "../api/axios";
import VendorInquiries from "./VendorInquiries";
import VendorReturns from "./VendorReturns";


export default function VendorDashboard() {
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [page, setPage] = useState("products");

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    const res = await api.get("/products/my", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(res.data);
  };

  const fetchOrders = async () => {
    const res = await api.get("/orders/vendor", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrders(res.data);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    formData.append("stock", newProduct.stock);
    formData.append("image", file);

    try {
      await api.post("/products", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Product added!");
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Add product failed");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Product deleted!");
      fetchProducts();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.patch(
        `/orders/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Order status updated!");
      fetchOrders();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <div
        style={{
          width: "220px",
          background: "#f0f0f0",
          padding: "20px",
          borderRight: "1px solid #ccc",
        }}
      >
        <h3>Vendor Panel</h3>

        <p style={{ cursor: "pointer" }} onClick={() => setPage("products")}>
          My Products
        </p>

        <p style={{ cursor: "pointer" }} onClick={() => setPage("add")}>
          Add Product
        </p>

        <p style={{ cursor: "pointer" }} onClick={() => setPage("orders")}>
          Orders
        </p>

        <p style={{ cursor: "pointer" }} onClick={() => setPage("inquiries")}>
          Enquiries
        </p>
        <p style={{ cursor: "pointer" }} onClick={() => setPage("returns")}>
          Returns
        </p>

        <p
          style={{
            cursor: "pointer",
            color: "red",
            marginTop: "20px",
            fontWeight: "bold",
          }}
          onClick={logout}
        >
          Logout
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flexGrow: 1, padding: "20px" }}>

        {/* PRODUCTS PAGE */}
        {page === "products" && (
          <div>
            <h2>My Products</h2>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {products.map((p) => (
                <div
                  key={p._id}
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    width: "180px",
                  }}
                >
                  <img
                    src={p.image}
                    style={{
                      width: "100%",
                      height: "120px",
                      objectFit: "cover",
                    }}
                  />

                  <h4>{p.name}</h4>
                  <p>₹{p.price}</p>
                  <button onClick={() => deleteProduct(p._id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ADD PRODUCT PAGE */}
        {page === "add" && (
          <div>
            <h2>Add Product</h2>

            <form onSubmit={handleAddProduct}>
              <input
                placeholder="Name"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
              <input
                placeholder="Description"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
              />
              <input
                placeholder="Price"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
              <input
                placeholder="Stock"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stock: e.target.value })
                }
              />

              <input type="file" onChange={(e) => setFile(e.target.files[0])} />

              <button type="submit">Add Product</button>
            </form>
          </div>
        )}

        {/* ORDERS PAGE */}
        {page === "orders" && (
          <div>
            <h2>Orders for You</h2>

            {orders.map((o) => (
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

                {/* NEW STATUS FIELDS */}
                <p><b>Order Status:</b> {o.status}</p>
                <p><b>Payment Status:</b> {o.paymentStatus}</p>

                {/* STATUS DROPDOWN */}
                <select
                  value={o.status}
                  onChange={(e) => updateOrderStatus(o._id, e.target.value)}
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <p><b>Items:</b></p>
                {o.items.map((i) => (
                  <div key={i._id}>
                    <p>{i.productId?.name} (x{i.quantity})</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ENQUIRIES PAGE */}
        {page === "inquiries" && <VendorInquiries />}
        {page === "returns" && <VendorReturns />}

      </div>
    </div>
  );
}

