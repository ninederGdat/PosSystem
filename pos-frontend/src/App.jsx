import { Routes, Route, Link } from "react-router-dom";
import PosPage from "./pages/PosPage";
import RealtimeOrdersPage from "./pages/RealtimeOrdersPage";

function App() {
  return (
    <div
      style={{
        fontFamily: "sans-serif",
        minHeight: "100vh",
        background: "#5596d6ff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          background: "#001d3d",
          color: "white",
          padding: "15px 20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ margin: 0, fontSize: "1.8em" }}>
            Hệ thống POS đơn giản
          </h1>
          <nav>
            <Link
              to="/"
              style={{
                color: "white",
                fontWeight: "bold",
                marginRight: "30px",
                textDecoration: "none",
                padding: "10px 18px",
                borderRadius: "6px",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "#1890ff")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              POS Screen
            </Link>
            <Link
              to="/orders"
              style={{
                color: "white",
                fontWeight: "bold",
                textDecoration: "none",
                padding: "10px 18px",
                borderRadius: "6px",
                transition: "all 0.3s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "#1890ff")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              Realtime Orders
            </Link>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1, padding: "30px 20px" }}>
        <Routes>
          <Route path="/" element={<PosPage />} />
          <Route path="/orders" element={<RealtimeOrdersPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
