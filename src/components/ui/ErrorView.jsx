import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const ErrorView = ({ 
  title = "Something went wrong", 
  message = "We encountered an error while loading the application. Please try again.", 
  onRetry,
  className = "" 
}) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 p-4 ${className}`}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ delay: 0.1, duration: 0.3, type: "spring" }}
          className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <ApperIcon name="AlertTriangle" className="w-8 h-8 text-white" />
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-600 leading-relaxed">{message}</p>
        </motion.div>

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="mt-8 space-y-3"
        >
          <Button onClick={handleRetry} className="w-full">
            <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <button 
              onClick={() => window.location.href = "/"} 
              className="hover:text-gray-700 transition-colors duration-200"
            >
              <ApperIcon name="Home" className="w-4 h-4 inline mr-1" />
              Go Home
            </button>
            <span>|</span>
            <button 
              onClick={() => window.location.reload()} 
              className="hover:text-gray-700 transition-colors duration-200"
            >
              <ApperIcon name="RotateCcw" className="w-4 h-4 inline mr-1" />
              Refresh Page
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          className="mt-8 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200"
        >
          <p className="text-xs text-gray-500">
            If the problem persists, please check your internet connection or try again later.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorView;