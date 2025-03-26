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

const NotificationBadge = ({ type }: { type: Notification['type'] }) => {
  const badgeColors: Record<Notification['type'], string> = {
    order: "bg-blue-100 text-blue-800",
    payment: "bg-green-100 text-green-800",
    user: "bg-purple-100 text-purple-800",
    inventory: "bg-yellow-100 text-yellow-800"
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeColors[type]}`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
};

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [filter, setFilter] = useState<Notification['type'] | null>(null);

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const filterNotifications = (type: Notification['type'] | null) => {
    setFilter(type);
  };

  const filteredNotifications = filter
    ? notifications.filter((n) => n.type === filter)
    : notifications;

  const filterButtons = [
    { label: "All", type: null },
    { label: "Orders", type: "order" },
    { label: "Payments", type: "payment" },
    { label: "Users", type: "user" },
    { label: "Inventory", type: "inventory" }
  ] as const;

  return (
    <div className="max-w-4xl my-10 mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
          Notifications
        </h2>
      </div>

      <div className="p-4 bg-gray-50 border-b">
        <div className="flex space-x-2 overflow-x-auto">
          {filterButtons.map(({ label, type }) => (
            <button
              key={label}
              onClick={() => filterNotifications(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === type 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No notifications to display
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 hover:bg-gray-50 transition-colors duration-200 ${
                notification.read ? "opacity-60" : ""
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-grow">
                  <p className="font-semibold text-gray-800">{notification.message}</p>
                  <div className="flex items-center mt-2 space-x-3">
                    <span className="text-sm text-gray-500">{notification.timestamp}</span>
                    <NotificationBadge type={notification.type} />
                  </div>
                </div>
                {!notification.read && (
                  <button 
                    onClick={() => markAsRead(notification.id)}
                    className="ml-4 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-full p-2 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;