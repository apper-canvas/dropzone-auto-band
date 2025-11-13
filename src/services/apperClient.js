/**
 * Singleton class to manage ApperClient instance
 * Prevents multiple SDK initializations
 */
class ApperClientSingleton {
  constructor() {
    this._client = null;
    this._isInitializing = false;
  }

  getInstance() {
    // Return cached instance if exists
    if (this._client) {
      return this._client;
    }

    // SDK not loaded yet
    if (!window.ApperSDK) {
      console.warn('ApperSDK not available on window object');
      return null;
    }

    // Prevent simultaneous initialization
    if (this._isInitializing) {
      return null;
    }

    try {
      this._isInitializing = true;
      
      const { ApperClient } = window.ApperSDK;
      const projectId = import.meta.env.VITE_APPER_PROJECT_ID;
      const publicKey = import.meta.env.VITE_APPER_PUBLIC_KEY;

      if (!projectId) {
        console.error('VITE_APPER_PROJECT_ID is required');
        return null;
      }

      this._client = new ApperClient({
        apperProjectId: projectId,
        apperPublicKey: publicKey,
      });

      return this._client;
    } catch (error) {
      console.error('Failed to initialize ApperClient:', error);
      return null;
    } finally {
      this._isInitializing = false;
    }
  }

  reset() {
    if (this._client) {
      this._client = null;
    }
  }
}

// Create singleton instance
let _singletonInstance = null;

const getSingleton = () => {
  if (!_singletonInstance) {
    _singletonInstance = new ApperClientSingleton();
  }
  return _singletonInstance;
};

// Main export
export const getApperClient = () => getSingleton().getInstance();

// Alternative exports
export const apperClientSingleton = {
  getInstance: () => getSingleton().getInstance(),
  reset: () => getSingleton().reset(),
};

export default getSingleton;