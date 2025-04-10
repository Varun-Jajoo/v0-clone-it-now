
/**
 * API service for communicating with the Python backend
 */

const API_BASE_URL = 'http://localhost:5000';

export interface ApiResponse {
  response: string;
  image?: string;
  [key: string]: any;
}

/**
 * Send a prompt to the Python backend
 * @param prompt The user's text prompt
 * @returns Promise with the API response
 */
export const sendPromptToBackend = async (prompt: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });
    
    if (!response.ok) {
      throw new Error(`Backend returned status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error sending prompt to backend:', error);
    throw error;
  }
};

/**
 * Send a prompt with an image to the Python backend
 * @param prompt The user's text prompt
 * @param imageFile The image file to upload
 * @returns Promise with the API response
 */
export const sendImageToBackend = async (prompt: string, imageFile: File): Promise<ApiResponse> => {
  try {
    const formData = new FormData();
    formData.append('prompt', prompt);
    formData.append('image', imageFile);
    
    const response = await fetch(`${API_BASE_URL}/generate-with-image`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Backend returned status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error sending image to backend:', error);
    throw error;
  }
};
