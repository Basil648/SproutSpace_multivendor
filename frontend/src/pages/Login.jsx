// import { useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/auth/login", form);

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.user.role);

//       // redirect based on role
//       if (res.data.user.role === "customer") navigate("/customer");
//       if (res.data.user.role === "vendor") navigate("/vendor");
//       if (res.data.user.role === "admin") navigate("/admin");

//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>

//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//         />
//         <button type="submit">Login</button>
//       </form>

//       <button onClick={() => navigate("/register")}>Go to Register</button>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      if (res.data.user.role === "customer") navigate("/customer");
      if (res.data.user.role === "vendor") navigate("/vendor");
      if (res.data.user.role === "admin") navigate("/admin");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
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
          backgroundImage: "url('https://media.gettyimages.com/id/2160078318/photo/close-up-of-a-farmer-planting-a-lettuce-seedling-on-a-community-garden.jpg?s=612x612&w=0&k=20&c=tFN1tsq_7ZrY6EyK_zp7Fkt5skPmVaFZGraUt1wDHs4=')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      ></div>

      {/* RIGHT LOGIN SECTION (30%) */}
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          width: "100%",
          maxWidth: "30%",
          backgroundColor: "#8FAF9F",
          padding: "20px"
        }}
      >
        {/* WHITE LOGIN BOX */}
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
            LOGIN
          </h2>

          <form onSubmit={handleLogin}>
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
            <div className="mb-4">
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

            {/* LOGIN BUTTON */}
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
              LOGIN
            </button>
          </form>

          {/* GOTO REGISTER */}
          <p className="text-center mt-3" style={{ fontSize: "0.9rem" }}>
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{
                cursor: "pointer",
                color: "#8FAF9F",
                fontWeight: "600"
              }}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
