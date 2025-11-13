import { motion } from "framer-motion";

const Loading = ({ className = "" }) => {
  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 ${className}`}>
      <div className="text-center space-y-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-amber-400 rounded-full animate-spin mx-auto" style={{ animationDirection: "reverse", animationDuration: "0.8s" }}></div>
        </motion.div>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="space-y-2"
        >
          <h3 className="text-lg font-semibold text-gray-800">Loading DropZone</h3>
          <p className="text-sm text-gray-600">Preparing your upload experience...</p>
        </motion.div>
        {/* Skeleton for upload interface */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="w-[400px] max-w-full mx-auto space-y-4"
        >
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 bg-white/50 backdrop-blur-sm">
            <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded-md w-32 mx-auto animate-pulse"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;