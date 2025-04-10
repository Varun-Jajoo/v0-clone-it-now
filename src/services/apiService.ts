
/**
 * API service for communicating with the Python backend
 */

const API_BASE_URL = 'http://localhost:5000';

export interface ApiResponse {
  response: string;
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
