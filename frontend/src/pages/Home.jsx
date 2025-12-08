// export default function Home() {
//   const user = JSON.parse(localStorage.getItem("user"));

//   const handleStart = () => {
//     if (!user) {
//       // Not logged in → send to login
//       return (window.location.href = "/login");
//     }

//     // Logged in → redirect based on role
//     if (user.role === "customer") return (window.location.href = "/customer");
//     if (user.role === "vendor") return (window.location.href = "/vendor");
//     if (user.role === "admin") return (window.location.href = "/admin");
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Community Farm Marketplace</h2>
//       <p>Fresh produce. Direct from farmers.</p>

//       <button
//         onClick={handleStart}
//         style={{ padding: "10px 20px", marginTop: "20px", cursor: "pointer" }}
//       >
//         Get Started
//       </button>
//     <button className="btn btn-success">Bootstrap Works</button>


//     </div>
//   );
// }

import AOS from "aos";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleStart = () => {
    if (!user) return (window.location.href = "/login");
    if (user.role === "customer") return (window.location.href = "/customer");
    if (user.role === "vendor") return (window.location.href = "/vendor");
    if (user.role === "admin") return (window.location.href = "/admin");
  };

  return (
    <div style={{ backgroundColor: "#F7F7F2" }}>

      {/* MOVING TEXT BAR */}
      <div className="bg-success text-white py-2 moving-text">
        <span className="fw-semibold">
          FRESH PRODUCE • COMMUNITY FARMING • SUSTAINABLE LIVING • DIRECT FROM FARMERS •
        </span>
      </div>

      {/* HERO CAROUSEL */}
      <div
        id="heroCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner">

          {/* Slide 1 */}
          <div className="carousel-item active">
            <img
              src="https://media.gettyimages.com/id/482802995/photo/sunrise-on-the-farm-man-working-thru-crop-field.jpg?s=612x612&w=0&k=20&c=9n7Y1HyP5auu1Xr1SDXkiTooXkiBUP_ogd9gTMT8S0U="
              className="d-block w-100"
              alt="Farm 1"
              style={{
                height: "70vh",
                objectFit: "cover",
                filter: "brightness(65%)"
              }}
            />
            <div className="carousel-caption d-flex flex-column justify-content-center h-100">
              <h1 className="fw-bold display-5">FRESH • ORGANIC • COMMUNITY</h1>
              <p className="lead fw-light">Direct produce from farmers to your home.</p>
              <button className="btn btn-light btn-sm mt-3 px-3" onClick={handleStart}>
                GET STARTED
              </button>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item">
            <img
              src="https://media.gettyimages.com/id/533356166/photo/keeping-it-in-the-family.jpg?s=612x612&w=0&k=20&c=DhDwXQv9g0lXcRHFNRBUWC6XCvQAQJ5cJLJcQ5vW0r4="
              className="d-block w-100"
              alt="Farm 2"
              style={{
                height: "70vh",
                objectFit: "cover",
                filter: "brightness(65%)"
              }}
            />
            <div className="carousel-caption d-flex flex-column justify-content-center h-100">
              <h1 className="fw-bold display-5">SUPPORTING LOCAL FARMERS</h1>
              <p className="lead fw-light">Sustainable farming for a better tomorrow.</p>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="carousel-item">
            <img
              src="https://media.gettyimages.com/id/1495293871/photo/group-of-farmer-family-and-community-working-on-rice-field-together.jpg?s=612x612&w=0&k=20&c=H6o5_NYAklTTAXYiNiYlw3bYa5THiH3jLsEgBbIBA_g="
              className="d-block w-100"
              alt="Farm 3"
              style={{
                height: "70vh",
                objectFit: "cover",
                filter: "brightness(65%)"
              }}
            />
            <div className="carousel-caption d-flex flex-column justify-content-center h-100">
              <h1 className="fw-bold display-5">HEALTHY FOOD • HEALTHY COMMUNITY</h1>
              <p className="lead fw-light">Good food starts with the right people.</p>
            </div>
          </div>

        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="container py-5">
        <h2 className="text-center fw-bold mb-4" style={{ color: "#8FAF9F" }}>
          OUR FEATURES
        </h2>

        <div className="row g-4">
          <div className="col-md-4" data-aos="fade-up">
            <div className="p-4 shadow rounded bg-white h-100">
              <h4 className="fw-semibold" style={{ color: "#8FAF9F" }}>ORGANIC PRODUCE</h4>
              <p className="text-secondary mt-2">
                Fresh, chemical-free vegetables and fruits grown by our farmers.
              </p>
            </div>
          </div>

          <div className="col-md-4" data-aos="fade-up" data-aos-delay="150">
            <div className="p-4 shadow rounded bg-white h-100">
              <h4 className="fw-semibold" style={{ color: "#8FAF9F" }}>LOCAL PARTNERSHIPS</h4>
              <p className="text-secondary mt-2">
                Connecting communities to promote sustainable development.
              </p>
            </div>
          </div>

          <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
            <div className="p-4 shadow rounded bg-white h-100">
              <h4 className="fw-semibold" style={{ color: "#8FAF9F" }}>ECO-FRIENDLY PRACTICES</h4>
              <p className="text-secondary mt-2">
                We support farming that respects nature and reduces waste.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS SECTION */}
      <div className="py-5" style={{ backgroundColor: "#E8EFEA" }}>
        <h2 className="text-center fw-bold mb-4" style={{ color: "#8FAF9F" }}>
          WHAT OUR CLIENTS SAY
        </h2>

        <div className="container">
          <div className="row g-4">

            <div className="col-md-4" data-aos="zoom-in">
              <div className="p-4 bg-white shadow-sm rounded h-100">
                <p className="text-secondary">
                  “Amazing produce quality and super fresh! I order every week.”
                </p>
                <h6 className="fw-bold mt-3" style={{ color: "#8FAF9F" }}>— PRIYA</h6>
              </div>
            </div>

            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="150">
              <div className="p-4 bg-white shadow-sm rounded h-100">
                <p className="text-secondary">
                  “A beautiful initiative empowering farmers and helping consumers.”
                </p>
                <h6 className="fw-bold mt-3" style={{ color: "#8FAF9F" }}>— ARJUN</h6>
              </div>
            </div>

            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="300">
              <div className="p-4 bg-white shadow-sm rounded h-100">
                <p className="text-secondary">
                  “Affordable prices, ethical sourcing, and great service!”
                </p>
                <h6 className="fw-bold mt-3" style={{ color: "#8FAF9F" }}>— MEERA</h6>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
