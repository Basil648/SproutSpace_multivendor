export default function Footer() {
  return (
    <footer
      className="text-center py-3 mt-5"
      style={{
        backgroundColor: "#A7C4A0",
        color: "white",
        letterSpacing: "1px"
      }}
    >
      © {new Date().getFullYear()} SproutSpace — All Rights Reserved
    </footer>
  );
}
