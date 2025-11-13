import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import ProgressBar from "@/components/atoms/ProgressBar";
import FilePreview from "@/components/molecules/FilePreview";
import { formatFileSize } from "@/utils/fileUtils";
import { cn } from "@/utils/cn";

const FileCard = ({ 
  file, 
  onRemove,
  onRetry,
  showProgress = true,
  className = ""
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "text-green-600";
      case "error": return "text-red-600";
      case "uploading": return "text-blue-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed": return "CheckCircle";
      case "error": return "XCircle";
      case "uploading": return "Upload";
      default: return "Clock";
    }
  };

  const getProgressVariant = (status) => {
    switch (status) {
      case "completed": return "success";
      case "error": return "danger";
      case "uploading": return "default";
      default: return "default";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-200",
        file.status === "error" && "border-red-200 bg-red-50/30",
        file.status === "completed" && "border-green-200 bg-green-50/30",
        className
      )}
    >
      <div className="flex items-center space-x-3">
        {/* File Preview */}
        <FilePreview file={file} size="md" />

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-sm font-medium text-gray-900 truncate">
              {file.name}
            </h4>
            <div className="flex items-center space-x-2">
              <ApperIcon 
                name={getStatusIcon(file.status)} 
                className={cn("w-4 h-4", getStatusColor(file.status))}
              />
              {file.status !== "completed" && onRemove && (
                <Button
                  onClick={() => onRemove(file.id)}
                  variant="ghost"
                  size="xs"
                  className="hover:bg-red-100 hover:text-red-600"
                >
                  <ApperIcon name="X" className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>{formatFileSize(file.size)}</span>
            {file.uploadedAt && (
              <span>
                {new Date(file.uploadedAt).toLocaleTimeString()}
              </span>
            )}
          </div>

          {/* Progress Bar */}
          {showProgress && file.status !== "completed" && (
            <ProgressBar
              value={file.progress}
              max={100}
              size="sm"
              variant={getProgressVariant(file.status)}
              showPercentage={false}
              className="mb-2"
            />
          )}

          {/* Error Message */}
          {file.status === "error" && file.error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200"
            >
              <div className="flex items-center justify-between">
                <span>{file.error}</span>
                {onRetry && (
                  <Button
                    onClick={() => onRetry(file.id)}
                    variant="ghost"
                    size="xs"
                    className="text-red-600 hover:bg-red-100 ml-2"
                  >
                    <ApperIcon name="RefreshCw" className="w-3 h-3 mr-1" />
                    Retry
                  </Button>
                )}
              </div>
            </motion.div>
          )}

          {/* Upload Progress Text */}
          {file.status === "uploading" && (
            <div className="text-xs text-blue-600 font-medium">
              Uploading... {Math.round(file.progress)}%
            </div>
          )}

          {file.status === "completed" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-green-600 font-medium flex items-center"
            >
              <ApperIcon name="CheckCircle" className="w-3 h-3 mr-1" />
              Upload complete
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FileCard;