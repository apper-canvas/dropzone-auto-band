import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const FilePreview = ({ file, size = "md" }) => {
  const [imageError, setImageError] = useState(false);
  
  const isImage = file.type?.startsWith("image/");
  const canPreview = isImage && file.preview && !imageError;
  
  const getFileIcon = (type) => {
    if (type?.startsWith("image/")) return "Image";
    if (type?.startsWith("video/")) return "Video";
    if (type?.startsWith("audio/")) return "Music";
    if (type?.includes("pdf")) return "FileText";
    if (type?.includes("zip") || type?.includes("rar")) return "Archive";
    if (type?.includes("word")) return "FileText";
    if (type?.includes("excel") || type?.includes("spreadsheet")) return "FileSpreadsheet";
    return "File";
  };

  const sizeStyles = {
    xs: "w-6 h-6",
    sm: "w-8 h-8", 
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20"
  };

  const iconSizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8",
    xl: "w-10 h-10"
  };

  if (canPreview) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0",
          sizeStyles[size]
        )}
      >
        <img
          src={file.preview}
          alt={file.name}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center flex-shrink-0",
        sizeStyles[size]
      )}
    >
      <ApperIcon 
        name={getFileIcon(file.type)} 
        className={cn("text-blue-600", iconSizes[size])}
      />
    </motion.div>
  );
};

export default FilePreview;