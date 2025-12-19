import { useState, useEffect } from "react";
import api from "../services/api";
import {
  getSignalRConnection,
  startConnection,
  stopConnection,
} from "../services/signalr";

export default function RealtimeOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let connection = null;

    const setupRealtime = async () => {
      try {
        const response = await api.get("/orders");
        setOrders(response.data.reverse());
        setLoading(false);

        connection = getSignalRConnection();
        await startConnection();

        connection.on("ReceiveNewOrder", (newOrder) => {
          setOrders((prevOrders) => {
            if (prevOrders.some((o) => o.orderCode === newOrder.orderCode)) {
              return prevOrders;
            }

            return [newOrder, ...prevOrders];
          });
        });

        console.log("SignalR connected và đang lắng nghe");
      } catch (err) {
        console.error("Lỗi khi setup realtime:", err);
        setLoading(false);
      }
    };

    setupRealtime();

    return () => {
      if (connection) {
        stopConnection();
        console.log("SignalR disconnected");
      }
    };
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN");
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
      <h1>Màn hình đơn hàng realtime</h1>

      {loading && <p>Đang tải danh sách đơn hàng...</p>}

      {!loading && orders.length === 0 && <p>Chưa có đơn hàng nào.</p>}

      {!loading && orders.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f0f0f0", color: "#333" }}>
              <th style={{ padding: "10px", border: "1px solid #e0e0e0" }}>
                Mã đơn
              </th>
              <th style={{ padding: "10px", border: "1px solid #e0e0e0" }}>
                Tổng tiền
              </th>
              <th style={{ padding: "10px", border: "1px solid #e0e0e0" }}>
                Thời gian
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.orderCode}
                style={{
                  background: index % 2 === 0 ? "#ffffff" : "#f8f9fa",
                  transition: "background 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#e6f7ff")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background =
                    index % 2 === 0 ? "#ffffff" : "#f8f9fa")
                }
              >
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #e0e0e0",
                    textAlign: "center",
                    color: "#333",
                  }}
                >
                  {order.orderCode}
                </td>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #e0e0e0",
                    textAlign: "right",
                    color: "#333",
                  }}
                >
                  {formatPrice(order.totalAmount)}
                </td>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #e0e0e0",
                    textAlign: "center",
                    color: "#333",
                  }}
                >
                  {formatDate(order.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
