import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No files selected", 
  message = "Choose files to upload or drag them into the drop zone to get started.", 
  actionLabel = "Browse Files",
  onAction,
  icon = "Upload",
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`text-center py-12 ${className}`}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, duration: 0.3, type: "spring" }}
        className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <ApperIcon name={icon} className="w-8 h-8 text-blue-600" />
      </motion.div>

      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="space-y-3"
      >
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 max-w-sm mx-auto">{message}</p>
      </motion.div>

      {onAction && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="mt-6"
        >
          <Button onClick={onAction} variant="outline" size="sm">
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            {actionLabel}
          </Button>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500"
      >
        <div className="flex items-center">
          <ApperIcon name="Zap" className="w-4 h-4 mr-1 text-amber-500" />
          Fast uploads
        </div>
        <div className="flex items-center">
          <ApperIcon name="Shield" className="w-4 h-4 mr-1 text-green-500" />
          Secure transfer
        </div>
        <div className="flex items-center">
          <ApperIcon name="CheckCircle" className="w-4 h-4 mr-1 text-blue-500" />
          Multiple formats
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Empty;