import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  size = "md",
  showPercentage = true,
  variant = "default",
  className = ""
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizeStyles = {
    xs: "h-1",
    sm: "h-2", 
    md: "h-3",
    lg: "h-4"
  };

  const variants = {
    default: "from-primary to-blue-700",
    success: "from-green-500 to-green-600",
    warning: "from-amber-500 to-orange-500",
    danger: "from-red-500 to-red-600"
  };

  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "w-full bg-gray-200 rounded-full overflow-hidden",
        sizeStyles[size]
      )}>
        <motion.div
          className={cn(
            "h-full bg-gradient-to-r rounded-full transition-all duration-300",
            variants[variant]
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      {showPercentage && size !== "xs" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-700"
        >
          {Math.round(percentage)}%
        </motion.div>
      )}
    </div>
  );
};

export default ProgressBar;