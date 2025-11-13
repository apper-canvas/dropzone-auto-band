import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const DropZone = ({ 
onFileAdded,
  accept = "*/*",
  multiple = false,
  maxSize = 100 * 1024 * 1024, // 100MB
  disabled = false,
  className = ""
}) => {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  const validateFile = useCallback((file) => {
    if (file.size > maxSize) {
      return `File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`;
    }
    return null;
  }, [maxSize]);

  const processFiles = useCallback((files) => {
const fileArray = Array.from(files);
    if (fileArray.length === 0) return;
    
    const file = fileArray[0]; // Only process the first file
    const error = validateFile(file);
    
    if (error) {
      console.warn("File validation error:", `${file.name}: ${error}`);
      return;
    }

    // Create file object with preview for images
    const fileObj = {
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      status: "pending",
      progress: 0,
      file: file,
      preview: null,
      uploadedAt: null,
      error: null
    };

    // Generate preview for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        fileObj.preview = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    onFileAdded(fileObj);
  }, [onFileAdded, validateFile]);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    setDragCounter(prev => prev + 1);
    if (dragCounter === 0) {
      setIsDragOver(true);
    }
  }, [dragCounter]);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragCounter(prev => prev - 1);
    if (dragCounter <= 1) {
      setIsDragOver(false);
    }
  }, [dragCounter]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    setDragCounter(0);

    if (disabled) return;

const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFiles(files);
    }
  }, [disabled, processFiles]);

const handleFileInput = useCallback((e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = "";
  }, [processFiles]);

  const handleClick = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(className)}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInput}
        className="hidden"
        disabled={disabled}
      />

      <motion.div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        animate={{
          scale: isDragOver ? 1.02 : 1,
          borderColor: isDragOver ? "#f59e0b" : "#cbd5e1"
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-200",
          "hover:border-accent hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          isDragOver && "border-accent bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg",
          disabled && "opacity-50 cursor-not-allowed hover:border-gray-300",
          "bg-white shadow-sm hover:shadow-md"
        )}
        tabIndex={0}
        role="button"
        aria-label="Upload files"
      >
        <motion.div
          animate={{ 
            y: isDragOver ? -5 : 0,
            scale: isDragOver ? 1.1 : 1
          }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          <div className={cn(
            "w-16 h-16 mx-auto rounded-full flex items-center justify-center",
            "bg-gradient-to-br from-blue-100 to-indigo-100",
            isDragOver && "from-amber-100 to-orange-100"
          )}>
            <ApperIcon 
              name={isDragOver ? "Download" : "Upload"} 
              className={cn(
                "w-8 h-8",
                isDragOver ? "text-amber-600" : "text-blue-600"
              )}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {isDragOver ? "Drop files here" : "Upload your files"}
            </h3>
<p className="text-gray-600 max-w-sm mx-auto">
              {isDragOver 
                ? "Release to add file to your upload queue"
                : "Drag and drop a file here, or click to browse"
              }
            </p>
          </div>

          {!isDragOver && (
<Button
              variant="outline"
              size="lg"
              className="mt-6"
              disabled={disabled}
            >
              <ApperIcon name="FolderOpen" className="w-5 h-5 mr-2" />
              Choose File
            </Button>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="mt-6 flex items-center justify-center space-x-8 text-sm text-gray-500"
      >
        <div className="flex items-center">
          <ApperIcon name="Shield" className="w-4 h-4 mr-2 text-green-500" />
          Secure upload
        </div>
        <div className="flex items-center">
          <ApperIcon name="Zap" className="w-4 h-4 mr-2 text-blue-500" />
          Fast transfer
        </div>
        <div className="flex items-center">
          <ApperIcon name="HardDrive" className="w-4 h-4 mr-2 text-purple-500" />
          {Math.round(maxSize / (1024 * 1024))}MB max
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DropZone;