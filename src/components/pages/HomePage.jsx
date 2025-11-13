import { motion } from "framer-motion";
import FileUploader from "@/components/organisms/FileUploader";
import ApperIcon from "@/components/ApperIcon";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
            className="w-20 h-20 bg-gradient-to-br from-primary to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <ApperIcon name="CloudUpload" className="w-10 h-10 text-white" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Upload Files with
            <span className="block bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
              Confidence
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Drag, drop, and upload your files with real-time progress tracking. 
            Fast, secure, and reliable file transfers with visual feedback every step of the way.
          </p>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm text-gray-600 mb-12"
          >
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
              <ApperIcon name="Upload" className="w-4 h-4 mr-2 text-blue-500" />
              Drag & Drop
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
              <ApperIcon name="BarChart3" className="w-4 h-4 mr-2 text-green-500" />
              Progress Tracking
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
              <ApperIcon name="FileStack" className="w-4 h-4 mr-2 text-purple-500" />
              Batch Upload
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
              <ApperIcon name="Shield" className="w-4 h-4 mr-2 text-amber-500" />
              100MB Max
            </div>
          </motion.div>
        </motion.div>

        {/* File Uploader Component */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-12"
        >
          <FileUploader />
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ApperIcon name="Lightbulb" className="w-5 h-5 mr-2 text-yellow-500" />
            Upload Tips
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-start">
              <ApperIcon name="CheckCircle" className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Supported formats: Images, videos, documents, archives, and more</span>
            </div>
            <div className="flex items-start">
              <ApperIcon name="Clock" className="w-4 h-4 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
              <span>Multiple files can be uploaded simultaneously</span>
            </div>
            <div className="flex items-start">
              <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2 text-purple-500 mt-0.5 flex-shrink-0" />
              <span>Failed uploads can be retried individually</span>
            </div>
            <div className="flex items-start">
              <ApperIcon name="Eye" className="w-4 h-4 mr-2 text-orange-500 mt-0.5 flex-shrink-0" />
              <span>Image previews are generated automatically</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;