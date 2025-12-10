// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import VerifyOtp from "./pages/VerifyOtp";
// import CustomerDashboard from "./pages/CustomerDashboard";
// import VendorDashboard from "./pages/VendorDashboard";
// import AdminDashboard from "./pages/AdminDashboard";
// import ProductDetails from "./pages/ProductDetails";
// import Cart from "./pages/Cart";
// import Billing from "./pages/Billing";
// import ProtectedRoute from "./components/ProtectedRoute";
// import PaymentSuccess from "./pages/PaymentSuccess";
// import PaymentCancel from "./pages/PaymentCancel";
// import CustomerProfile from "./pages/profile";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* PUBLIC ROUTES */}
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/verify" element={<VerifyOtp />} />
//         <Route path="/payment-success" element={<PaymentSuccess />} />
//         <Route path="/payment-cancel" element={<PaymentCancel />} />
//         {/* <Route path="/profile" element={<CustomerProfile />} /> */}

//         {/* PROTECTED ROUTES */}
//         <Route
//           path="/customer"
//           element={
//             <ProtectedRoute>
//               <CustomerDashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/vendor"
//           element={
//             <ProtectedRoute>
//               <VendorDashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/product/:id"
//           element={
//             <ProtectedRoute>
//               <ProductDetails />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/cart"
//           element={
//             <ProtectedRoute>
//               <Cart />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/checkout"
//           element={
//             <ProtectedRoute>
//               <Billing />
//             </ProtectedRoute>
//           }
//         />

//       </Routes>

//       <Route
//         path="/profile"
//         element={
//           <ProtectedRoute>
//             <CustomerProfile />
//           </ProtectedRoute>
//         }
//       />

//       {/* </Routes> */}
//     </BrowserRouter>
//   );
// }

// export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";

import CustomerDashboard from "./pages/CustomerDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Billing from "./pages/Billing";

import ProtectedRoute from "./components/ProtectedRoute";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";

import CustomerProfile from "./pages/profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyOtp />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-cancel" element={<PaymentCancel />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor"
          element={
            <ProtectedRoute>
              <VendorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Billing />
            </ProtectedRoute>
          }
        />

        {/* PROFILE ROUTE — PROTECTED */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <CustomerProfile />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
