import { useState, useEffect } from "react";
import api from "../services/api";

export default function PosPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi fetch products:", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.productId === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prevCart,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ];
    });
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const checkout = async () => {
    if (cart.length === 0) {
      alert("Giỏ hàng trống, vui lòng thêm sản phẩm!");
      return;
    }

    const orderRequest = {
      items: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    try {
      await api.post("/orders", orderRequest);
      alert("Thanh toán thành công!");
      setCart([]);
    } catch (err) {
      console.error("Lỗi thanh toán:", err);
      alert("Thanh toán thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1400px",
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <h1>Màn hình bán hàng (POS)</h1>

      {loading && <p>Đang tải danh sách sản phẩm...</p>}

      {!loading && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            width: "100%",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                textAlign: "center",
                background: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>
                {product.name}
              </h3>
              <p
                style={{
                  fontSize: "1.2em",
                  fontWeight: "bold",
                  color: "#d4380d",
                }}
              >
                {formatPrice(product.price)}
              </p>
              <button
                onClick={() => addToCart(product)}
                style={{
                  padding: "10px 20px",
                  background: "#1677ff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Thêm vào giỏ
              </button>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          background: "#f9f9f9",
          borderRadius: "8px",
          width: "100%",
        }}
      >
        <h2
          style={{
            color: "black",
          }}
        >
          Giỏ hàng ({cart.reduce((sum, item) => sum + item.quantity, 0)} sản
          phẩm)
        </h2>
        {cart.length === 0 ? (
          <p
            style={{
              color: "black",
            }}
          >
            Giỏ hàng trống
          </p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.productId}
                style={{
                  color: "black",
                  padding: "8px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                {item.name} x {item.quantity} ={" "}
                {formatPrice(item.price * item.quantity)}
              </div>
            ))}
            <p
              style={{
                fontSize: "1.3em",
                fontWeight: "bold",
                marginTop: "15px",
                color: "#000",
              }}
            >
              Tổng tiền: {formatPrice(calculateTotal())}
            </p>
            {cart.length > 0 && (
              <div style={{ marginTop: "20px", textAlign: "right" }}>
                <button
                  onClick={checkout}
                  style={{
                    padding: "12px 30px",
                    fontSize: "1.2em",
                    background: "#52c41a",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Thanh toán
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
