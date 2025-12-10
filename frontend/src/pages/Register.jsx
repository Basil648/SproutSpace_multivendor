// import { useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "customer",
//     phone: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/auth/register", form);

//       localStorage.setItem("registerUserId", res.data.userId);

//       navigate("/verify");
//     } catch (err) {
//       alert(err.response?.data?.message || "Register failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>

//       <form onSubmit={handleRegister}>
//         <input name="name" placeholder="Name" onChange={handleChange} />
//         <input name="email" placeholder="Email" onChange={handleChange} />
//         <input name="password" placeholder="Password" onChange={handleChange} />
//         <input name="phone" placeholder="Phone" onChange={handleChange} />

//         <select name="role" onChange={handleChange}>
//           <option value="customer">Customer</option>
//           <option value="vendor">Vendor</option>
//         </select>

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    phone: ""
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", form);

      localStorage.setItem("registerUserId", res.data.userId);

      navigate("/verify");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div
      className="d-flex"
      style={{
        height: "100vh",
        backgroundColor: "#F7F7F2",
        overflow: "hidden"
      }}
    >
      {/* LEFT IMAGE SECTION (70%) */}
      <div
        className="d-none d-md-block"
        style={{
          width: "70%",
          backgroundImage: "url('https://media.gettyimages.com/id/1495293871/photo/group-of-farmer-family-and-community-working-on-rice-field-together.jpg?s=612x612&w=0&k=20&c=H6o5_NYAklTTAXYiNiYlw3bYa5THiH3jLsEgBbIBA_g=')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      ></div>

      {/* RIGHT REGISTER SECTION (30%) */}
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          width: "100%",
          maxWidth: "30%",
          backgroundColor: "#8FAF9F",
          padding: "20px"
        }}
      >
        {/* WHITE REGISTER BOX */}
        <div
          className="shadow-lg p-4 rounded"
          style={{
            width: "100%",
            maxWidth: "350px",
            backgroundColor: "white"
          }}
        >
          <h2
            className="text-center fw-bold mb-4"
            style={{ color: "#8FAF9F" }}
          >
            REGISTER
          </h2>

          <form onSubmit={handleRegister}>
            {/* NAME */}
            <div className="mb-3">
              <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
                required
                className="form-control p-3"
                style={{
                  borderRadius: "10px",
                  border: "1px solid #D6D6D6",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.08)"
                }}
              />
            </div>

            {/* EMAIL */}
            <div className="mb-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
                className="form-control p-3"
                style={{
                  borderRadius: "10px",
                  border: "1px solid #D6D6D6",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.08)"
                }}
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-3">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="form-control p-3"
                style={{
                  borderRadius: "10px",
                  border: "1px solid #D6D6D6",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.08)"
                }}
              />
            </div>

            {/* PHONE */}
            <div className="mb-3">
              <input
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                required
                className="form-control p-3"
                style={{
                  borderRadius: "10px",
                  border: "1px solid #D6D6D6",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.08)"
                }}
              />
            </div>

            {/* ROLE */}
            <div className="mb-4">
              <select
                name="role"
                onChange={handleChange}
                className="form-select p-3"
                style={{
                  borderRadius: "10px",
                  border: "1px solid #D6D6D6",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.08)"
                }}
              >
                <option value="customer">Customer</option>
                <option value="vendor">Vendor</option>
              </select>
            </div>

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              className="btn w-100 fw-semibold py-2"
              style={{
                backgroundColor: "#8FAF9F",
                color: "white",
                borderRadius: "10px",
                letterSpacing: "1px"
              }}
            >
              REGISTER
            </button>
          </form>

          {/* GOTO LOGIN */}
          <p className="text-center mt-3" style={{ fontSize: "0.9rem" }}>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{
                cursor: "pointer",
                color: "#8FAF9F",
                fontWeight: "600"
              }}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
