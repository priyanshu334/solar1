import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  ClipboardList, 
  Building2, 
  Settings, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Bell, 
  Menu, 
  X 
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for demonstration
const usersData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
];

const productsData = [
  { id: 1, name: 'Solar Panel 300W', category: 'Solar Panels', price: '₹12,000', stock: 45 },
  { id: 2, name: 'Inverter 5kW', category: 'Inverters', price: '₹45,000', stock: 12 },
  { id: 3, name: 'Battery 200Ah', category: 'Batteries', price: '₹18,000', stock: 23 },
  { id: 4, name: 'Mounting Structure', category: 'Accessories', price: '₹8,500', stock: 34 },
];

const tasksData = [
  { id: 1, title: 'System Maintenance', assignee: 'John Doe', dueDate: '2024-04-15', status: 'In Progress' },
  { id: 2, title: 'Client Meeting', assignee: 'Jane Smith', dueDate: '2024-04-10', status: 'Completed' },
  { id: 3, title: 'Product Testing', assignee: 'Bob Johnson', dueDate: '2024-04-20', status: 'Pending' },
];

const departmentsData = [
  { id: 1, name: 'Sales', manager: 'Jane Smith', employees: 12 },
  { id: 2, name: 'Engineering', manager: 'John Doe', employees: 8 },
  { id: 3, name: 'Operations', manager: 'Alice Brown', employees: 5 },
];

const revenueData = [
  { month: 'Jan', revenue: 400000 },
  { month: 'Feb', revenue: 300000 },
  { month: 'Mar', revenue: 600000 },
  { month: 'Apr', revenue: 800000 },
  { month: 'May', revenue: 500000 },
  { month: 'Jun', revenue: 900000 },
];

const AdminPanel = () => {
  const location = useLocation();
  const [notifications] = useState([
    { id: 1, title: 'New Order', message: 'Order #1234 has been placed', time: '2 hours ago' },
    { id: 2, title: 'Maintenance Alert', message: 'System maintenance scheduled', time: '1 day ago' },
  ]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

     {/* Responsive Sidebar Component */}
<aside 
  className={`
    fixed md:static inset-y-0 left-0 z-40 w-64 bg-white shadow-md 
    transform transition-transform duration-300 ease-in-out
    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
    md:translate-x-0
  `}
  aria-label="Admin Sidebar"
>
  {/* Header with Optional Close Button on Mobile */}
  <div className="flex items-center justify-between p-4">
    <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
    <button 
      className="md:hidden text-gray-600 hover:text-gray-900"
      onClick={() => setSidebarOpen(false)}
      aria-label="Close Sidebar"
    >
      <X className="h-6 w-6" />
    </button>
  </div>

  {/* Navigation Links */}
  <nav className="mt-4">
    {[
      { 
        to: "/admin", 
        icon: LayoutDashboard, 
        label: "Dashboard" 
      },
      { 
        to: "/admin/users", 
        icon: Users, 
        label: "User Management" 
      },
      { 
        to: "/admin/products", 
        icon: ShoppingBag, 
        label: "Product Management" 
      },
      { 
        to: "/admin/tasks", 
        icon: ClipboardList, 
        label: "Task Management" 
      },
      { 
        to: "/admin/departments", 
        icon: Building2, 
        label: "Departments" 
      },
      { 
        to: "/admin/settings", 
        icon: Settings, 
        label: "Settings" 
      }
    ].map(({ to, icon: Icon, label }) => (
      <Link
        key={to}
        to={to}
        className={`
          flex items-center px-4 py-2 
          ${location.pathname === to ? 'bg-blue-50 text-blue-600' : 'text-gray-700'} 
          hover:bg-gray-100 
          transition-colors duration-200
          group
        `}
        onClick={() => setSidebarOpen(false)}
        aria-current={location.pathname === to ? 'page' : undefined}
      >
        <Icon 
          className={`
            h-5 w-5 mr-2 
            ${location.pathname === to ? 'text-blue-600' : 'text-gray-500'}
            group-hover:text-blue-500
            transition-colors duration-200
          `}
        />
        {label}
      </Link>
    ))}
  </nav>
</aside>

{/* Mobile Overlay */}
{sidebarOpen && (
  <div 
    className="
      fixed inset-0 bg-black bg-opacity-50 z-30 
      md:hidden 
      animate-fade-in
    "
    onClick={() => setSidebarOpen(false)}
    aria-hidden="true"
  />
)}
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-8">
          {/* Notification Bar */}
          <div className="mb-6 md:mb-8 flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <div className="relative">
             <a href='/notify'> <Bell className="h-6 w-6 text-gray-600 cursor-pointer" /></a>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notifications.length}
              </span>
            </div>
          </div>

          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/tasks" element={<TaskManagement />} />
            <Route path="/departments" element={<DepartmentManagement />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <h3 className="text-base md:text-lg font-semibold mb-2">Total Projects</h3>
          <p className="text-2xl md:text-3xl font-bold text-blue-600">156</p>
          <p className="text-xs md:text-sm text-gray-500 mt-2">12% increase from last month</p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <h3 className="text-base md:text-lg font-semibold mb-2">Active Plants</h3>
          <p className="text-2xl md:text-3xl font-bold text-green-600">89</p>
          <p className="text-xs md:text-sm text-gray-500 mt-2">5 new this week</p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <h3 className="text-base md:text-lg font-semibold mb-2">Total Revenue</h3>
          <p className="text-2xl md:text-3xl font-bold text-yellow-600">₹4.2M</p>
          <p className="text-xs md:text-sm text-gray-500 mt-2">18% increase from last quarter</p>
        </div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg shadow mb-6 md:mb-8">
        <h3 className="text-base md:text-lg font-semibold mb-4">Revenue Overview</h3>
        <div className="h-64 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-3 md:p-4 border-b">
            <h3 className="text-base md:text-lg font-semibold">Recent Activities</h3>
          </div>
          <div className="p-3 md:p-4 border-b">
            <p className="text-sm md:text-base text-gray-600">New user registered: Alice Brown</p>
            <p className="text-xs md:text-sm text-gray-400">2 hours ago</p>
          </div>
          <div className="p-3 md:p-4 border-b">
            <p className="text-sm md:text-base text-gray-600">Order #1234 completed</p>
            <p className="text-xs md:text-sm text-gray-400">1 day ago</p>
          </div>
          <div className="p-3 md:p-4">
            <p className="text-sm md:text-base text-gray-600">System maintenance performed</p>
            <p className="text-xs md:text-sm text-gray-400">2 days ago</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-3 md:p-4 border-b">
            <h3 className="text-base md:text-lg font-semibold">Quick Actions</h3>
          </div>
          <div className="p-3 md:p-4 grid grid-cols-2 gap-3 md:gap-4">
            <Link 
              to="/admin/users" 
              className="p-3 md:p-4 border rounded-lg text-center hover:bg-blue-50 hover:text-blue-600 text-sm md:text-base"
            >
              <Users className="h-5 md:h-6 w-5 md:w-6 mx-auto mb-1 md:mb-2" />
              Add User
            </Link>
            <Link 
              to="/admin/products" 
              className="p-3 md:p-4 border rounded-lg text-center hover:bg-blue-50 hover:text-blue-600 text-sm md:text-base"
            >
              <ShoppingBag className="h-5 md:h-6 w-5 md:w-6 mx-auto mb-1 md:mb-2" />
              Add Product
            </Link>
            <Link 
              to="/admin/tasks" 
              className="p-3 md:p-4 border rounded-lg text-center hover:bg-blue-50 hover:text-blue-600 text-sm md:text-base"
            >
              <ClipboardList className="h-5 md:h-6 w-5 md:w-6 mx-auto mb-1 md:mb-2" />
              Create Task
            </Link>
            <Link 
              to="/admin/departments" 
              className="p-3 md:p-4 border rounded-lg text-center hover:bg-blue-50 hover:text-blue-600 text-sm md:text-base"
            >
              <Building2 className="h-5 md:h-6 w-5 md:w-6 mx-auto mb-1 md:mb-2" />
              Add Department
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserManagement = () => {
  type UserKey = 'id' | 'name' | 'email' | 'role' | 'status';
  const [users, setUsers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ 
    key: UserKey; 
    direction: 'ascending' | 'descending' 
  }>({
    key: 'name',
    direction: 'ascending'
  });
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User', status: 'Active' });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (key: UserKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredUsers = sortedUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    const newId = Math.max(...users.map(user => user.id)) + 1;
    setUsers([...users, { id: newId, ...newUser }]);
    setNewUser({ name: '', email: '', role: 'User', status: 'Active' });
    setShowAddUser(false);
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6 gap-4">
          <h2 className="text-xl font-semibold">User Management</h2>
          <button
            onClick={() => setShowAddUser(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            <span className="text-sm md:text-base">Add User</span>
          </button>
        </div>

        {showAddUser && (
          <div className="mb-4 md:mb-6 p-3 md:p-4 border rounded-lg">
            <h3 className="text-base md:text-lg font-medium mb-3 md:mb-4">Add New User</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="w-full p-2 text-sm md:text-base border rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full p-2 text-sm md:text-base border rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  className="w-full p-2 text-sm md:text-base border rounded-md"
                >
                  <option value="User">User</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={newUser.status}
                  onChange={(e) => setNewUser({...newUser, status: e.target.value})}
                  className="w-full p-2 text-sm md:text-base border rounded-md"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddUser(false)}
                className="px-3 md:px-4 py-1 md:py-2 text-sm md:text-base border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="bg-blue-600 text-white px-3 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-md hover:bg-blue-700"
                disabled={!newUser.name || !newUser.email}
              >
                Save User
              </button>
            </div>
          </div>
        )}

        <div className="mb-3 md:mb-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 w-full text-sm md:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Name
                    {sortConfig.key === 'name' && (
                      sortConfig.direction === 'ascending' ? 
                      <ChevronUp className="ml-1 h-3 md:h-4 w-3 md:w-4" /> : 
                      <ChevronDown className="ml-1 h-3 md:h-4 w-3 md:w-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('email')}
                >
                  <div className="flex items-center">
                    Email
                    {sortConfig.key === 'email' && (
                      sortConfig.direction === 'ascending' ? 
                      <ChevronUp className="ml-1 h-3 md:h-4 w-3 md:w-4" /> : 
                      <ChevronDown className="ml-1 h-3 md:h-4 w-3 md:w-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('role')}
                >
                  <div className="flex items-center">
                    Role
                    {sortConfig.key === 'role' && (
                      sortConfig.direction === 'ascending' ? 
                      <ChevronUp className="ml-1 h-3 md:h-4 w-3 md:w-4" /> : 
                      <ChevronDown className="ml-1 h-3 md:h-4 w-3 md:w-4" />
                    )}
                  </div>
                </th>
                <th 
                  className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    Status
                    {sortConfig.key === 'status' && (
                      sortConfig.direction === 'ascending' ? 
                      <ChevronUp className="ml-1 h-3 md:h-4 w-3 md:w-4" /> : 
                      <ChevronDown className="ml-1 h-3 md:h-4 w-3 md:w-4" />
                    )}
                  </div>
                </th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                    {user.role}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-2 md:mr-3">
                      <Edit className="h-3 md:h-4 w-3 md:w-4" />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 className="h-3 md:h-4 w-3 md:w-4" />
                    </button>
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

const ProductManagement = () => {
  const [products, setProducts] = useState(productsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ 
    name: '', 
    category: '', 
    price: '', 
    stock: '' 
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    const newId = Math.max(...products.map(product => product.id)) + 1;
    setProducts([...products, { 
      id: newId, 
      ...newProduct,
      stock: parseInt(newProduct.stock)
    }]);
    setNewProduct({ name: '', category: '', price: '', stock: '' });
    setShowAddProduct(false);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6 gap-4">
          <h2 className="text-xl font-semibold">Product Management</h2>
          <button
            onClick={() => setShowAddProduct(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            <span className="text-sm md:text-base">Add Product</span>
          </button>
        </div>

        {showAddProduct && (
          <div className="mb-4 md:mb-6 p-3 md:p-4 border rounded-lg">
            <h3 className="text-base md:text-lg font-medium mb-3 md:mb-4">Add New Product</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full p-2 text-sm md:text-base border rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  className="w-full p-2 text-sm md:text-base border rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="text"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className="w-full p-2 text-sm md:text-base border rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  className="w-full p-2 text-sm md:text-base border rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddProduct(false)}
                className="px-3 md:px-4 py-1 md:py-2 text-sm md:text-base border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                className="bg-blue-600 text-white px-3 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-md hover:bg-blue-700"
                disabled={!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stock}
              >
                Save Product
              </button>
            </div>
          </div>
        )}

        <div className="mb-3 md:mb-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 w-full text-sm md:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                    {product.price}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                    {product.stock}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-2 md:mr-3">
                      <Edit className="h-3 md:h-4 w-3 md:w-4" />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-3 md:h-4 w-3 md:w-4" />
                    </button>
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

const TaskManagement = () => {
  const [tasks, setTasks] = useState(tasksData);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({ 
    title: '', 
    assignee: '', 
    dueDate: '', 
    status: 'Pending' 
  });

  const handleAddTask = () => {
    const newId = Math.max(...tasks.map(task => task.id)) + 1;
    setTasks([...tasks, { 
      id: newId, 
      ...newTask
    }]);
    setNewTask({ title: '', assignee: '', dueDate: '', status: 'Pending' });
    setShowAddTask(false);
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6 gap-4">
          <h2 className="text-xl font-semibold">Task Management</h2>
          <button
            onClick={() => setShowAddTask(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            <span className="text-sm md:text-base">Add Task</span>
          </button>
        </div>

        {showAddTask && (
          <div className="mb-4 md:mb-6 p-3 md:p-4 border rounded-lg">
            <h3 className="text-base md:text-lg font-medium mb-3 md:mb-4">Add New Task</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full p-2 text-sm md:text-base border rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Assignee</label>
                <select
                  value={newTask.assignee}
                  onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                  className="w-full p-2 text-sm md:text-base border rounded-md"
                >
                  <option value="">Select Assignee</option>
                  {usersData.map(user => (
                    <option key={user.id} value={user.name}>{user.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  className="w-full p-2 text-sm md:text-base border rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={newTask.status}
                  onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                  className="w-full p-2 text-sm md:text-base border rounded-md"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddTask(false)}
                className="px-3 md:px-4 py-1 md:py-2 text-sm md:text-base border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="bg-blue-600 text-white px-3 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-md hover:bg-blue-700"
                disabled={!newTask.title || !newTask.assignee || !newTask.dueDate}
              >
                Save Task
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Assignee
                </th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">
                    {task.title}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                    {task.assignee}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                    {task.dueDate}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusChange(task.id, e.target.value)}
                      className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${
                        task.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                        task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-2 md:mr-3">
                      <Edit className="h-3 md:h-4 w-3 md:w-4" />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <Trash2 className="h-3 md:h-4 w-3 md:w-4" />
                    </button>
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

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState(departmentsData);
  const [showAddDepartment, setShowAddDepartment] = useState(false);
  const [newDepartment, setNewDepartment] = useState({ 
    name: '', 
    manager: '', 
    employees: '' 
  });

  const handleAddDepartment = () => {
    const newId = Math.max(...departments.map(dept => dept.id)) + 1;
    setDepartments([...departments, { 
      id: newId, 
      ...newDepartment,
      employees: parseInt(newDepartment.employees)
    }]);
    setNewDepartment({ name: '', manager: '', employees: '' });
    setShowAddDepartment(false);
  };

  const handleDeleteDepartment = (id: number) => {
    setDepartments(departments.filter(dept => dept.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6 gap-4">
          <h2 className="text-xl font-semibold">Department Management</h2>
          <button
            onClick={() => setShowAddDepartment(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            <span className="text-sm md:text-base">Add Department</span>
          </button>
        </div>

        {showAddDepartment && (
          <div className="mb-4 md:mb-6 p-3 md:p-4 border rounded-lg">
            <h3 className="text-base md:text-lg font-medium mb-3 md:mb-4">Add New Department</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newDepartment.name}
                  onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                  className="w-full p-2 text-sm md:text-base border rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Manager</label>
                <select
                  value={newDepartment.manager}
                  onChange={(e) => setNewDepartment({...newDepartment, manager: e.target.value})}
                  className="w-full p-2 text-sm md:text-base border rounded-md"
                >
                  <option value="">Select Manager</option>
                  {usersData.filter(user => user.role === 'Manager' || user.role === 'Admin').map(user => (
                    <option key={user.id} value={user.name}>{user.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Employees</label>
                <input
                  type="number"
                  value={newDepartment.employees}
                  onChange={(e) => setNewDepartment({...newDepartment, employees: e.target.value})}
                  className="w-full p-2 text-sm md:text-base border rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddDepartment(false)}
                className="px-3 md:px-4 py-1 md:py-2 text-sm md:text-base border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDepartment}
                className="bg-blue-600 text-white px-3 md:px-4 py-1 md:py-2 text-sm md:text-base rounded-md hover:bg-blue-700"
                disabled={!newDepartment.name || !newDepartment.manager || !newDepartment.employees}
              >
                Save Department
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Manager
                </th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Employees
                </th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {departments.map((dept) => (
                <tr key={dept.id}>
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">
                    {dept.name}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                    {dept.manager}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                    {dept.employees}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-2 md:mr-3">
                      <Edit className="h-3 md:h-4 w-3 md:w-4" />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDeleteDepartment(dept.id)}
                    >
                      <Trash2 className="h-3 md:h-4 w-3 md:w-4" />
                    </button>
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

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    timezone: 'Asia/Kolkata',
    language: 'en',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-6">Settings</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-base md:text-lg font-medium mb-4">General Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="darkMode"
                name="darkMode"
                checked={settings.darkMode}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="darkMode" className="ml-2 text-sm md:text-base text-gray-700">
                Dark Mode
              </label>
            </div>
            <div>
              <label htmlFor="timezone" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                Timezone
              </label>
              <select
                id="timezone"
                name="timezone"
                value={settings.timezone}
                onChange={handleChange}
                className="mt-1 block w-full p-2 text-sm md:text-base border rounded-md focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="Asia/Kolkata">India (Asia/Kolkata)</option>
                <option value="America/New_York">Eastern Time (America/New_York)</option>
                <option value="Europe/London">London (Europe/London)</option>
              </select>
            </div>
            <div>
              <label htmlFor="language" className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <select
                id="language"
                name="language"
                value={settings.language}
                onChange={handleChange}
                className="mt-1 block w-full p-2 text-sm md:text-base border rounded-md focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="es">Spanish</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-base md:text-lg font-medium mb-4">Notification Settings</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="notifications"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="notifications" className="ml-2 text-sm md:text-base text-gray-700">
                Enable Notifications
              </label>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm md:text-base"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;