import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, FileText, PlusSquare, MessageSquare, User, Bell, Download, Upload } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

// Mock data for demonstration
const energyData = [
  { date: '2024-03-01', generation: 245 },
  { date: '2024-03-02', generation: 256 },
  { date: '2024-03-03', generation: 234 },
  { date: '2024-03-04', generation: 267 },
  { date: '2024-03-05', generation: 278 },
  { date: '2024-03-06', generation: 289 },
  { date: '2024-03-07', generation: 245 },
];

const notifications = [
  { id: 1, title: 'Maintenance Alert', message: 'Scheduled maintenance tomorrow', time: '2 hours ago' },
  { id: 2, title: 'Performance Update', message: 'Your system is performing optimally', time: '1 day ago' },
];

const CustomerPortal = () => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">Customer Portal</h2>
        </div>
        <nav className="mt-4">
          <Link 
            to="/portal" 
            className={`flex items-center px-4 py-2 ${location.pathname === '/portal' ? 'bg-green-50 text-green-600' : 'text-gray-700'} hover:bg-gray-100`}
          >
            <Home className="h-5 w-5 mr-2" />
            Dashboard
          </Link>
          <Link 
            to="/portal/orders" 
            className={`flex items-center px-4 py-2 ${location.pathname === '/portal/orders' ? 'bg-green-50 text-green-600' : 'text-gray-700'} hover:bg-gray-100`}
          >
            <FileText className="h-5 w-5 mr-2" />
            My Orders
          </Link>
          <Link 
            to="/portal/plants" 
            className={`flex items-center px-4 py-2 ${location.pathname === '/portal/plants' ? 'bg-green-50 text-green-600' : 'text-gray-700'} hover:bg-gray-100`}
          >
            <PlusSquare className="h-5 w-5 mr-2" />
            My Plants
          </Link>
          <Link 
            to="/portal/support" 
            className={`flex items-center px-4 py-2 ${location.pathname === '/portal/support' ? 'bg-green-50 text-green-600' : 'text-gray-700'} hover:bg-gray-100`}
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            Support
          </Link>
          <Link 
            to="/portal/profile" 
            className={`flex items-center px-4 py-2 ${location.pathname === '/portal/profile' ? 'bg-green-50 text-green-600' : 'text-gray-700'} hover:bg-gray-100`}
          >
            <User className="h-5 w-5 mr-2" />
            Profile
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Notification Bar */}
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Welcome, John Doe</h1>
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-600 cursor-pointer" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notifications.length}
              </span>
            </div>
          </div>

          <Routes>
            <Route path="/" element={<CustomerDashboard data={energyData} />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/plants" element={<Plants />} />
            <Route path="/support" element={<Support />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const CustomerDashboard = ({ data }: { data: { date: string; generation: number }[]}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Today's Generation</h3>
          <p className="text-3xl font-bold text-green-600">245 kWh</p>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <Upload className="h-4 w-4 mr-1 text-green-500" />
            <span>12% increase from yesterday</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Monthly Savings</h3>
          <p className="text-3xl font-bold text-blue-600">₹3,450</p>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <Download className="h-4 w-4 mr-1 text-green-500" />
            <span>Saved 420 kg CO₂</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">System Health</h3>
          <p className="text-3xl font-bold text-green-600">98%</p>
          <p className="text-sm text-gray-500 mt-2">All systems operational</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="text-lg font-semibold mb-4">Energy Generation</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => format(new Date(date), 'MMM dd')}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(date) => format(new Date(date), 'MMM dd, yyyy')}
                formatter={(value) => [`${value} kWh`, 'Generation']}
              />
              <Line 
                type="monotone" 
                dataKey="generation" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: '#10B981' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Recent Activities</h3>
          </div>
          <div className="p-4 border-b">
            <p className="text-gray-600">Maintenance check completed</p>
            <p className="text-sm text-gray-400">2 days ago</p>
          </div>
          <div className="p-4 border-b">
            <p className="text-gray-600">Energy report generated</p>
            <p className="text-sm text-gray-400">5 days ago</p>
          </div>
          <div className="p-4">
            <p className="text-gray-600">System optimization performed</p>
            <p className="text-sm text-gray-400">1 week ago</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold">Notifications</h3>
          </div>
          {notifications.map((notification) => (
            <div key={notification.id} className="p-4 border-b">
              <p className="font-medium text-gray-800">{notification.title}</p>
              <p className="text-gray-600">{notification.message}</p>
              <p className="text-sm text-gray-400 mt-1">{notification.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Orders = () => {
  const orders = [
    { id: 1, date: '2024-03-01', status: 'Completed', amount: '₹45,000' },
    { id: 2, date: '2024-02-15', status: 'In Progress', amount: '₹32,000' },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">My Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Plants = () => {
  const plants = [
    {
      id: 1,
      name: 'Home Rooftop',
      capacity: '5kW',
      status: 'Active',
      lastMaintenance: '2024-02-28',
      efficiency: '95%',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">My Plants</h2>
        {plants.map((plant) => (
          <div key={plant.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">{plant.name}</h3>
                <p className="text-gray-500">Capacity: {plant.capacity}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-sm ${
                plant.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {plant.status}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Last Maintenance</p>
                <p className="font-medium">{plant.lastMaintenance}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Efficiency</p>
                <p className="font-medium">{plant.efficiency}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Support = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle message submission
    setMessage('');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Support</h2>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Contact Support</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-32 p-2 border rounded-md"
            placeholder="Type your message here..."
          />
          <button
            type="submit"
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Send Message
          </button>
        </form>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2">FAQs</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium">How often should I clean my solar panels?</h4>
            <p className="text-gray-600">We recommend cleaning your solar panels every 6 months.</p>
          </div>
          <div>
            <h4 className="font-medium">What happens during a power outage?</h4>
            <p className="text-gray-600">Your system will automatically shut down for safety reasons.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                defaultValue="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                defaultValue="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                defaultValue="+1234567890"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                defaultValue="123 Solar Street"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Security</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Notifications</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailNotifications"
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                defaultChecked
              />
              <label htmlFor="emailNotifications" className="ml-2 text-gray-700">
                Email Notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="smsNotifications"
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                defaultChecked
              />
              <label htmlFor="smsNotifications" className="ml-2 text-gray-700">
                SMS Notifications
              </label>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="button"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortal;