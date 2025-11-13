import React, { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { uploadFileService } from "@/services/api/uploadService";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import DropZone from "@/components/molecules/DropZone";
import UploadQueue from "@/components/molecules/UploadQueue";
import Button from "@/components/atoms/Button";

const FileUploader = ({ className = "" }) => {
const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

const handleFileAdded = useCallback((newFile) => {
    setFile(newFile);
    toast.success("File added to upload queue", {
      position: "top-right",
      autoClose: 2000
    });
  }, []);

const handleRemoveFile = useCallback(() => {
    setFile(null);
  }, []);

const handleRetryFile = useCallback(async () => {
    if (!file) return;

    // Reset file status
    setFile(prev => ({
      ...prev,
      status: "uploading",
      progress: 0,
      error: null
    }));

    try {
      await uploadSingleFile(file);
    } catch (error) {
      console.error("Retry upload failed:", error);
    }
  }, [file]);

const uploadSingleFile = useCallback(async (fileToUpload) => {
    return new Promise((resolve, reject) => {
      // Simulate upload progress
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(progressInterval);
          
          // Update file status to completed
          setFile(prev => ({
            ...prev,
            status: "completed",
            progress: 100,
            uploadedAt: new Date().toISOString()
          }));
          
          resolve();
        } else {
          // Update progress
          setFile(prev => ({
            ...prev,
            progress: Math.round(progress)
          }));
        }
      }, 200);

      // Simulate potential errors (10% chance)
      setTimeout(() => {
        if (Math.random() < 0.1 && progress < 100) {
          clearInterval(progressInterval);
          setFile(prev => ({
            ...prev,
            status: "error",
            error: "Upload failed. Please try again."
          }));
          reject(new Error("Upload failed"));
        }
      }, Math.random() * 2000 + 1000);
    });
  }, []);

const handleUploadFile = useCallback(async () => {
    if (!file || (file.status !== "pending" && file.status !== "error")) {
      toast.warning("No file to upload");
      return;
    }

    setIsUploading(true);

    // Update file to uploading status
    setFile(prev => ({
      ...prev,
      status: "uploading",
      progress: 0,
      error: null
    }));

    try {
      await uploadSingleFile(file);
      
      toast.success("File uploaded successfully!", {
        position: "top-right",
        autoClose: 3000
      });
    } catch (error) {
      toast.error("Upload failed. Please try again.", {
        position: "top-right",
        autoClose: 3000
      });
    } finally {
      setIsUploading(false);
    }
  }, [file, uploadSingleFile]);

const handleClearCompleted = useCallback(() => {
    if (!file || file.status !== "completed") {
      toast.info("No completed file to clear");
      return;
    }

    setFile(null);
    toast.success("Cleared completed file", {
      position: "top-right",
      autoClose: 2000
    });
  }, [file]);

const handleClearAll = useCallback(() => {
    if (!file) {
      toast.info("No file to clear");
      return;
    }

    setFile(null);
    toast.success("Cleared file from queue", {
      position: "top-right",
      autoClose: 2000
    });
  }, [file]);

const isPending = file && (file.status === "pending" || file.status === "error");
  const isCompleted = file && file.status === "completed";
  const isFileUploading = file && file.status === "uploading";
  return (
    <div className={cn("space-y-8", className)}>
      {/* Drop Zone */}
<DropZone
        onFileAdded={handleFileAdded}
multiple={false}
        maxSize={100 * 1024 * 1024} // 100MB
        disabled={isUploading || !!file}
      />
      {/* Upload Queue */}
      <AnimatePresence>
{file && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <UploadQueue
              file={file}
              onRemoveFile={handleRemoveFile}
              onRetryFile={handleRetryFile}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <AnimatePresence>
{file && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 p-6 bg-white rounded-lg border border-gray-200 shadow-sm"
          >
            {isPending && (
              <Button
                onClick={handleUploadFile}
                disabled={isUploading}
                size="lg"
                className="flex-1 sm:flex-none"
              >
                {isUploading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <ApperIcon name="Upload" className="w-5 h-5 mr-2" />
                    </motion.div>
                    Uploading File...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Upload" className="w-5 h-5 mr-2" />
                    Upload File
                  </>
                )}
              </Button>
            )}

            <div className="flex items-center space-x-2">
              {isCompleted && (
                <Button
                  onClick={handleClearCompleted}
                  variant="secondary"
                  size="md"
                  disabled={isUploading}
                >
                  <ApperIcon name="CheckCircle" className="w-4 h-4 mr-2" />
                  Clear Completed
                </Button>
              )}

              <Button
                onClick={handleClearAll}
                variant="ghost"
                size="md"
                disabled={isUploading}
                className="text-gray-600 hover:text-red-600 hover:bg-red-50"
              >
                <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
                Clear File
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUploader;