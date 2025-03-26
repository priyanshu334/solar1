import React, { useState } from "react";
import { ShoppingCart, ArrowLeft, Info, Sun, Zap, Battery, Bolt, Wind, Cloud, PanelRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced Product type interface
interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  icon: React.ElementType;
  features: string[];
  specifications: {
    [key: string]: string;
  };
  category: string;
}

// Expanded product data with more details
const products: Product[] = [
  {
    id: 1,
    name: "Solar Panel 100W Monocrystalline",
    price: "$150",
    description: "High-efficiency solar panel designed for residential and small commercial applications.",
    image: "https://cdn.britannica.com/94/192794-050-3F3F3DDD/panels-electricity-order-sunlight.jpg",
    icon: Sun,
    category: "Solar Panels",
    features: [
      "Monocrystalline silicon cells",
      "Aluminum frame for durability",
      "Waterproof junction box",
      "12-year product warranty"
    ],
    specifications: {
      wattage: "100W",
      voltage: "12V",
      efficiency: "22.5%"
    }
  },
  {
    id: 2,
    name: "Solar Inverter 3kW Hybrid",
    price: "$500",
    description: "Advanced hybrid inverter with smart grid integration and battery backup capabilities.",
    image: "https://cdn.britannica.com/94/192794-050-3F3F3DDD/panels-electricity-order-sunlight.jpg",
    icon: Zap,
    category: "Inverters",
    features: [
      "Grid-tie and off-grid functionality",
      "MPPT charge controller",
      "Wi-Fi monitoring",
      "Pure sine wave output"
    ],
    specifications: {
      wattage: "3000W",
      voltage: "220V/110V",
      efficiency: "95%"
    }
  },
  {
    id: 3,
    name: "Solar Battery 200Ah Lithium",
    price: "$300",
    description: "High-capacity lithium iron phosphate (LiFePO4) battery for reliable energy storage.",
    image: "https://cdn.britannica.com/94/192794-050-3F3F3DDD/panels-electricity-order-sunlight.jpg",
    icon: Battery,
    category: "Energy Storage",
    features: [
      "Long cycle life (3000+ cycles)",
      "Fast charging",
      "Lightweight design",
      "Built-in battery management system"
    ],
    specifications: {
      voltage: "12V",
      capacity: "200Ah",
      weight: "25kg"
    }
  },
  {
    id: 4,
    name: "Portable Solar Generator 1000W",
    price: "$799",
    description: "Compact and powerful solar generator for outdoor adventures and emergency backup.",
    image: "https://cdn.britannica.com/94/192794-050-3F3F3DDD/panels-electricity-order-sunlight.jpg",
    icon: Bolt,
    category: "Portable Power",
    features: [
      "Multiple output ports",
      "Quick solar charging",
      "Lightweight design",
      "Built-in LED flashlight"
    ],
    specifications: {
      capacity: "1000Wh",
      weight: "10kg",
      outlets: "AC, USB, 12V"
    }
  },
  {
    id: 5,
    name: "Wind Turbine 400W Horizontal",
    price: "$450",
    description: "Efficient small-scale wind turbine for residential and off-grid applications.",
    image: "https://cdn.britannica.com/94/192794-050-3F3F3DDD/panels-electricity-order-sunlight.jpg",
    icon: Wind,
    category: "Wind Energy",
    features: [
      "Low wind speed start",
      "Corrosion-resistant materials",
      "Automatic brake system",
      "Silent operation"
    ],
    specifications: {
      wattage: "400W",
      "cut-in speed": "3m/s",
      "max speed": "25m/s"
    }
  },
  {
    id: 6,
    name: "Smart Solar Charge Controller",
    price: "$129",
    description: "Advanced MPPT charge controller with smartphone app integration.",
    image: "https://cdn.britannica.com/94/192794-050-3F3F3DDD/panels-electricity-order-sunlight.jpg",
    icon: PanelRight,
    category: "Accessories",
    features: [
      "Bluetooth monitoring",
      "Temperature compensation",
      "Multiple battery type support",
      "LCD display"
    ],
    specifications: {
      voltage: "12V/24V",
      "max current": "40A",
      efficiency: "99%"
    }
  },
  {
    id: 7,
    name: "Grid-Tie Solar Micro Inverter",
    price: "$199",
    description: "Per-panel micro inverter for enhanced solar system performance.",
    image: "https://cdn.britannica.com/94/192794-050-3F3F3DDD/panels-electricity-order-sunlight.jpg",
    icon: Cloud,
    category: "Inverters",
    features: [
      "Individual panel optimization",
      "Real-time monitoring",
      "Weather-resistant design",
      "Easy installation"
    ],
    specifications: {
      "input voltage": "24V-40V",
      "output voltage": "230V",
      efficiency: "96.5%"
    }
  },
  {
    id: 8,
    name: "Flexible Solar Panel 50W",
    price: "$99",
    description: "Ultra-thin and lightweight flexible solar panel for curved surfaces.",
    image: "https://cdn.britannica.com/94/192794-050-3F3F3DDD/panels-electricity-order-sunlight.jpg",
    icon: Sun,
    category: "Solar Panels",
    features: [
      "Bendable up to 30 degrees",
      "Lightweight design",
      "Perfect for RVs and boats",
      "Weather-resistant"
    ],
    specifications: {
      wattage: "50W",
      weight: "2.5kg",
      efficiency: "20%"
    }
  }
];

const ProductsPage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = ['All', ...new Set(products.map(p => p.category))];

  // Filter products by category
  const filteredProducts = activeCategory && activeCategory !== 'All' 
    ? products.filter(p => p.category === activeCategory)
    : products;

  const ProductDetailView = () => {
    if (!selectedProduct) return null;

    return (
      <motion.div 
        key="product-detail"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl shadow-xl p-6 relative"
      >
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSelectedProduct(null)} 
          className="absolute top-4 left-4 text-gray-600 hover:text-green-600 flex items-center"
        >
          <ArrowLeft className="mr-2" /> Back to Products
        </motion.button>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name} 
              className="w-full rounded-lg shadow-md" 
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <selectedProduct.icon className="mr-3 text-green-600" size={36} />
              <h2 className="text-3xl font-bold text-gray-800">{selectedProduct.name}</h2>
            </div>
            <p className="text-green-600 font-semibold text-xl mb-4">{selectedProduct.price}</p>
            <p className="text-gray-700 mb-6">{selectedProduct.description}</p>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Features</h3>
              <motion.ul 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      delayChildren: 0.3,
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="space-y-2"
              >
                {selectedProduct.features.map((feature, index) => (
                  <motion.li 
                    key={index} 
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    className="flex items-center text-gray-600"
                  >
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Specifications</h3>
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      delayChildren: 0.5,
                      staggerChildren: 0.1
                    }
                  }
                }}
                className="grid grid-cols-2 gap-3"
              >
                {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                  <motion.div 
                    key={key}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="bg-green-50 p-3 rounded-md border border-green-100"
                  >
                    <p className="text-gray-500 capitalize">{key}</p>
                    <p className="font-semibold text-gray-800">{value}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition flex items-center justify-center"
            >
              <ShoppingCart className="mr-2" /> Add to Cart
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-green-50 to-blue-50 min-h-screen p-6"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center text-center mb-8"
        >
          <h1 className="text-5xl font-extrabold text-green-800 flex items-center mb-4">
            <ShoppingCart className="mr-3 text-green-600" size={52} />
            Renewable Energy Solutions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl text-center">
            Explore our comprehensive range of solar, wind, and energy storage solutions for sustainable power generation.
          </p>
        </motion.header>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center space-x-4 mb-8"
        >
          {categories.map(category => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category === 'All' ? null : category)}
              className={`
                px-4 py-2 rounded-full text-sm font-semibold transition
                ${activeCategory === category || (category === 'All' && !activeCategory) 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-green-100'
                }
              `}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedProduct ? (
            <motion.div 
              key="product-grid"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product) => (
                <motion.div 
                  key={product.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="relative">
                    <motion.img 
                      src={product.image} 
                      alt={product.name} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="w-full h-48 object-cover group-hover:scale-110 transition" 
                    />
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center mb-2">
                      <product.icon className="mr-2 text-green-600" size={24} />
                      <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
                    </div>
                    <p className="text-green-600 font-semibold text-lg mb-3">{product.price}</p>
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition flex items-center justify-center"
                    >
                      <Info className="mr-2" size={18} />
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <ProductDetailView />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProductsPage;