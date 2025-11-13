import uploadSessions from "@/services/mockData/uploadSessions.json";

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const uploadFileService = {
  // Simulate file upload with progress tracking
  async uploadFile(file, onProgress) {
    await delay(200);
    
    return new Promise((resolve, reject) => {
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        
        if (progress >= 100) {
          progress = 100;
          clearInterval(progressInterval);
          
          const uploadResult = {
            id: Date.now().toString(),
            name: file.name,
            size: file.size,
            type: file.type,
            status: "completed",
            progress: 100,
            uploadedAt: new Date().toISOString(),
            url: `https://example.com/files/${file.name}`,
            error: null
          };
          
          resolve(uploadResult);
        } else {
          if (onProgress) {
            onProgress(Math.round(progress));
          }
        }
      }, 200);

      // Simulate potential upload failures (5% chance)
      setTimeout(() => {
        if (Math.random() < 0.05 && progress < 100) {
          clearInterval(progressInterval);
          reject(new Error("Upload failed due to network error"));
        }
      }, Math.random() * 3000 + 1000);
    });
  },

  // Get all upload sessions
  async getAllSessions() {
    await delay(300);
    return [...uploadSessions];
  },

  // Get session by ID
  async getSessionById(sessionId) {
    await delay(200);
    const session = uploadSessions.find(s => s.Id === parseInt(sessionId));
    if (!session) {
      throw new Error(`Upload session with ID ${sessionId} not found`);
    }
    return { ...session };
  },

  // Create new upload session
  async createSession(sessionData) {
    await delay(250);
    const maxId = Math.max(...uploadSessions.map(s => s.Id), 0);
    const newSession = {
      Id: maxId + 1,
      files: sessionData.files || [],
      totalSize: sessionData.totalSize || 0,
      completedCount: 0,
      startedAt: new Date().toISOString(),
      completedAt: null,
      ...sessionData
    };
    uploadSessions.push(newSession);
    return { ...newSession };
  },

  // Update upload session
  async updateSession(sessionId, updateData) {
    await delay(200);
    const sessionIndex = uploadSessions.findIndex(s => s.Id === parseInt(sessionId));
    if (sessionIndex === -1) {
      throw new Error(`Upload session with ID ${sessionId} not found`);
    }
    
    uploadSessions[sessionIndex] = {
      ...uploadSessions[sessionIndex],
      ...updateData
    };
    
    return { ...uploadSessions[sessionIndex] };
  },

  // Delete upload session
  async deleteSession(sessionId) {
    await delay(200);
    const sessionIndex = uploadSessions.findIndex(s => s.Id === parseInt(sessionId));
    if (sessionIndex === -1) {
      throw new Error(`Upload session with ID ${sessionId} not found`);
    }
    
    const deletedSession = uploadSessions.splice(sessionIndex, 1)[0];
    return { ...deletedSession };
  },

  // Validate file before upload
  async validateFile(file, maxSize = 100 * 1024 * 1024) {
    await delay(100);
    
    const errors = [];
    
    if (file.size > maxSize) {
      errors.push(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`);
    }
    
    if (file.name.length > 255) {
      errors.push("File name is too long (max 255 characters)");
    }
    
    // Check for dangerous file extensions
    const dangerousExtensions = ['.exe', '.bat', '.cmd', '.scr', '.pif', '.com'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    if (dangerousExtensions.includes(fileExtension)) {
      errors.push("File type not allowed for security reasons");
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
};