import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { API_BASE_URL } from "./api";

let connection = null;

export const getSignalRConnection = () => {
  if (connection) return connection;

  connection = new HubConnectionBuilder()
    .withUrl(`${API_BASE_URL}/hubs/order`, { withCredentials: true })
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect()
    .build();

  return connection;
};

export const startConnection = async () => {
  const conn = getSignalRConnection();
  if (conn.state === "Disconnected") {
    try {
      await conn.start();
      console.log("SignalR Connected");
    } catch (err) {
      console.error("SignalR Connection Error:", err);
      throw err;
    }
  }
};

export const stopConnection = async () => {
  const conn = getSignalRConnection();
  if (conn.state !== "Disconnected") {
    try {
      await conn.stop();
      console.log("SignalR Disconnected");
      connection = null;
    } catch (err) {
      console.error("SignalR Stop Error:", err);
    }
  }
};
