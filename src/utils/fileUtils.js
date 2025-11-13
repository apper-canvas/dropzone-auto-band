// Format file size in human readable format
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Get file extension from filename
export const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
};

// Check if file is an image
export const isImageFile = (file) => {
  return file.type && file.type.startsWith("image/");
};

// Check if file is a video
export const isVideoFile = (file) => {
  return file.type && file.type.startsWith("video/");
};

// Check if file is an audio file
export const isAudioFile = (file) => {
  return file.type && file.type.startsWith("audio/");
};

// Generate a unique file ID
export const generateFileId = () => {
  return Date.now().toString() + "_" + Math.random().toString(36).substr(2, 9);
};

// Validate file size
export const validateFileSize = (file, maxSize = 100 * 1024 * 1024) => {
  return file.size <= maxSize;
};

// Get file type category
export const getFileCategory = (mimeType) => {
  if (!mimeType) return "unknown";
  
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.startsWith("audio/")) return "audio";
  if (mimeType.includes("pdf")) return "pdf";
  if (mimeType.includes("zip") || mimeType.includes("rar") || mimeType.includes("archive")) return "archive";
  if (mimeType.includes("word") || mimeType.includes("document")) return "document";
  if (mimeType.includes("excel") || mimeType.includes("spreadsheet")) return "spreadsheet";
  if (mimeType.includes("powerpoint") || mimeType.includes("presentation")) return "presentation";
  if (mimeType.includes("text/")) return "text";
  
  return "file";
};

// Create file preview URL for images
export const createFilePreview = (file) => {
  return new Promise((resolve, reject) => {
    if (!isImageFile(file)) {
      resolve(null);
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(new Error("Failed to create file preview"));
    reader.readAsDataURL(file);
  });
};

// Format upload time
export const formatUploadTime = (timestamp) => {
  if (!timestamp) return "";
  
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  
  return date.toLocaleDateString();
};

// Calculate total upload progress for multiple files
export const calculateTotalProgress = (files) => {
  if (!files || files.length === 0) return 0;
  
  const totalProgress = files.reduce((sum, file) => sum + (file.progress || 0), 0);
  return Math.round(totalProgress / files.length);
};

// Group files by status
export const groupFilesByStatus = (files) => {
  return files.reduce((groups, file) => {
    const status = file.status || "pending";
    if (!groups[status]) groups[status] = [];
    groups[status].push(file);
    return groups;
  }, {});
};