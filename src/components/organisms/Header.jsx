import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-gradient-to-br from-primary to-blue-700 rounded-lg flex items-center justify-center shadow-md"
            >
              <ApperIcon name="Upload" className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">DropZone</h1>
              <p className="text-xs text-gray-600 hidden sm:block">Fast & secure file uploads</p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <ApperIcon name="Shield" className="w-4 h-4 mr-1 text-green-500" />
                Secure
              </div>
              <div className="flex items-center">
                <ApperIcon name="Zap" className="w-4 h-4 mr-1 text-blue-500" />
                Fast
              </div>
              <div className="flex items-center">
                <ApperIcon name="Globe" className="w-4 h-4 mr-1 text-purple-500" />
                No limits
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              title="Help & Information"
            >
              <ApperIcon name="HelpCircle" className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;