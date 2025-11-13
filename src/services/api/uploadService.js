import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

export const uploadFileService = {
  // Simulate file upload with progress tracking
  async uploadFile(file, onProgress) {
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
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not available");
        return [];
      }

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "file_data_c"}},
          {"field": {"Name": "total_size_c"}},
          {"field": {"Name": "completed_count_c"}},
          {"field": {"Name": "started_at_c"}},
          {"field": {"Name": "completed_at_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ]
      };

      const response = await apperClient.fetchRecords('uploadsession_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Transform database format to UI format
      return response.data.map(session => ({
        Id: session.Id,
        Name: session.Name || 'Unnamed Session',
        Tags: session.Tags || '',
        files: session.file_data_c ? JSON.parse(session.file_data_c) : [],
        totalSize: session.total_size_c || 0,
        completedCount: session.completed_count_c || 0,
        startedAt: session.started_at_c || session.CreatedOn,
        completedAt: session.completed_at_c,
        createdOn: session.CreatedOn,
        modifiedOn: session.ModifiedOn
      }));
    } catch (error) {
      console.error("Error fetching upload sessions:", error?.response?.data?.message || error);
      return [];
    }
  },

  // Get session by ID
  async getSessionById(sessionId) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not available");
        throw new Error("ApperClient not available");
      }

      const params = {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "Tags"}},
          {"field": {"Name": "file_data_c"}},
          {"field": {"Name": "total_size_c"}},
          {"field": {"Name": "completed_count_c"}},
          {"field": {"Name": "started_at_c"}},
          {"field": {"Name": "completed_at_c"}},
          {"field": {"Name": "CreatedOn"}},
          {"field": {"Name": "ModifiedOn"}}
        ]
      };

      const response = await apperClient.getRecordById('uploadsession_c', parseInt(sessionId), params);

      if (!response?.data) {
        throw new Error(`Upload session with ID ${sessionId} not found`);
      }

      // Transform database format to UI format
      const session = response.data;
      return {
        Id: session.Id,
        Name: session.Name || 'Unnamed Session',
        Tags: session.Tags || '',
        files: session.file_data_c ? JSON.parse(session.file_data_c) : [],
        totalSize: session.total_size_c || 0,
        completedCount: session.completed_count_c || 0,
        startedAt: session.started_at_c || session.CreatedOn,
        completedAt: session.completed_at_c,
        createdOn: session.CreatedOn,
        modifiedOn: session.ModifiedOn
      };
    } catch (error) {
      console.error(`Error fetching session ${sessionId}:`, error?.response?.data?.message || error);
      throw error;
    }
  },

  // Create new upload session
  async createSession(sessionData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not available");
        throw new Error("ApperClient not available");
      }

      const params = {
        records: [{
          Name: sessionData.Name || `Upload Session ${Date.now()}`,
          Tags: sessionData.Tags || '',
          file_data_c: JSON.stringify(sessionData.files || []),
          total_size_c: sessionData.totalSize || 0,
          completed_count_c: sessionData.completedCount || 0,
          started_at_c: sessionData.startedAt || new Date().toISOString(),
          completed_at_c: sessionData.completedAt || null
        }]
      };

      const response = await apperClient.createRecord('uploadsession_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} sessions: ${failed.map(f => f.message || 'Unknown error').join(', ')}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          throw new Error("Failed to create upload session");
        }

        if (successful.length > 0) {
          const createdSession = successful[0].data;
          return {
            Id: createdSession.Id,
            Name: createdSession.Name,
            Tags: createdSession.Tags || '',
            files: sessionData.files || [],
            totalSize: sessionData.totalSize || 0,
            completedCount: sessionData.completedCount || 0,
            startedAt: sessionData.startedAt || new Date().toISOString(),
            completedAt: sessionData.completedAt
          };
        }
      }

      throw new Error("No successful results returned");
    } catch (error) {
      console.error("Error creating upload session:", error?.response?.data?.message || error);
      throw error;
    }
  },

  // Update upload session
  async updateSession(sessionId, updateData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not available");
        throw new Error("ApperClient not available");
      }

      // Prepare update payload - only include updateable fields
      const updatePayload = {
        Id: parseInt(sessionId)
      };

      if (updateData.Name !== undefined) updatePayload.Name = updateData.Name;
      if (updateData.Tags !== undefined) updatePayload.Tags = updateData.Tags;
      if (updateData.files !== undefined) updatePayload.file_data_c = JSON.stringify(updateData.files);
      if (updateData.totalSize !== undefined) updatePayload.total_size_c = updateData.totalSize;
      if (updateData.completedCount !== undefined) updatePayload.completed_count_c = updateData.completedCount;
      if (updateData.startedAt !== undefined) updatePayload.started_at_c = updateData.startedAt;
      if (updateData.completedAt !== undefined) updatePayload.completed_at_c = updateData.completedAt;

      const params = {
        records: [updatePayload]
      };

      const response = await apperClient.updateRecord('uploadsession_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} sessions: ${failed.map(f => f.message || 'Unknown error').join(', ')}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          throw new Error("Failed to update upload session");
        }

        if (successful.length > 0) {
          const updatedSession = successful[0].data;
          return {
            Id: updatedSession.Id,
            Name: updatedSession.Name,
            Tags: updatedSession.Tags || '',
            files: updatedSession.file_data_c ? JSON.parse(updatedSession.file_data_c) : [],
            totalSize: updatedSession.total_size_c || 0,
            completedCount: updatedSession.completed_count_c || 0,
            startedAt: updatedSession.started_at_c,
            completedAt: updatedSession.completed_at_c
          };
        }
      }

      throw new Error("No successful results returned");
    } catch (error) {
      console.error(`Error updating session ${sessionId}:`, error?.response?.data?.message || error);
      throw error;
    }
  },

  // Delete upload session
  async deleteSession(sessionId) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not available");
        throw new Error("ApperClient not available");
      }

      const params = { 
        RecordIds: [parseInt(sessionId)]
      };

      const response = await apperClient.deleteRecord('uploadsession_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} sessions: ${failed.map(f => f.message || 'Unknown error').join(', ')}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
          return false;
        }

        return successful.length > 0;
      }

      return false;
    } catch (error) {
      console.error(`Error deleting session ${sessionId}:`, error?.response?.data?.message || error);
      throw error;
    }
  },

  // Validate file before upload
  async validateFile(file, maxSize = 100 * 1024 * 1024) {
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