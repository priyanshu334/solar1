import React, { useState } from "react";

interface Notification {
  id: number;
  type: "order" | "payment" | "user" | "inventory";
  message: string;
  read: boolean;
  timestamp: string;
}

const sampleNotifications: Notification[] = [
  { id: 1, type: "order", message: "New order placed #12345", read: false, timestamp: "2m ago" },
  { id: 2, type: "payment", message: "Payment received for order #12345", read: true, timestamp: "10m ago" },
  { id: 3, type: "user", message: "New user registered: John Doe", read: false, timestamp: "1h ago" },
  { id: 4, type: "inventory", message: "Stock alert: Solar panels low", read: false, timestamp: "3h ago" },
];

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [filter, setFilter] = useState<string | null>(null);

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const filterNotifications = (type: string | null) => {
    setFilter(type);
  };

  const filteredNotifications = filter
    ? notifications.filter((n) => n.type === filter)
    : notifications;

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "10px" }}>🔔 Notifications</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <button onClick={() => filterNotifications(null)}>All</button>
        <button onClick={() => filterNotifications("order")}>Orders</button>
        <button onClick={() => filterNotifications("payment")}>Payments</button>
        <button onClick={() => filterNotifications("user")}>Users</button>
        <button onClick={() => filterNotifications("inventory")}>Inventory</button>
      </div>
      <div>
        {filteredNotifications.map((notification) => (
          <div key={notification.id} style={{ 
            padding: "10px", 
            marginBottom: "10px", 
            border: "1px solid #ccc", 
            borderRadius: "5px", 
            backgroundColor: notification.read ? "#f1f1f1" : "#fff" 
          }}>
            <p><strong>{notification.message}</strong></p>
            <span style={{ fontSize: "0.9rem", color: "#555" }}>{notification.timestamp}</span>
            <div style={{ marginTop: "5px" }}>
              {!notification.read && (
                <button onClick={() => markAsRead(notification.id)} style={{ marginRight: "10px" }}>
                  ✅ Mark as Read
                </button>
              )}
              <span style={{ padding: "5px", backgroundColor: "#ddd", borderRadius: "3px" }}>{notification.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;