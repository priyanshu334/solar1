import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Sun className="h-8 w-8 text-yellow-500" />
              <span className="ml-2 text-xl font-bold text-gray-800">Rooftop Urja</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md">
              Home
            </Link>
            <Link to="/portal" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md">
              Customer Portal
            </Link>
            <Link to="/admin" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md">
              Admin Panel
            </Link>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-green-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block text-gray-700 hover:text-green-600 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/portal"
              className="block text-gray-700 hover:text-green-600 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Customer Portal
            </Link>
            <Link
              to="/admin"
              className="block text-gray-700 hover:text-green-600 px-3 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Panel
            </Link>
            <button className="w-full text-left bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;