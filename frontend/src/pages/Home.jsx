export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleStart = () => {
    if (!user) {
      // Not logged in → send to login
      return (window.location.href = "/login");
    }

    // Logged in → redirect based on role
    if (user.role === "customer") return (window.location.href = "/customer");
    if (user.role === "vendor") return (window.location.href = "/vendor");
    if (user.role === "admin") return (window.location.href = "/admin");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Community Farm Marketplace</h2>
      <p>Fresh produce. Direct from farmers.</p>

      <button
        onClick={handleStart}
        style={{ padding: "10px 20px", marginTop: "20px", cursor: "pointer" }}
      >
        Get Started
      </button>
    </div>
  );
}
