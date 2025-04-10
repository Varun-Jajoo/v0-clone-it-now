
/**
 * API service for communicating with the Python backend
 */

const API_BASE_URL = 'http://localhost:5000';

export interface ApiResponse {
  response: string;
  image?: string;
  [key: string]: any;
}

export interface PublishResponse {
  url: string;
  deploymentId: string;
  status: 'success' | 'failed';
  message?: string;
}

export interface GitHubRepoResponse {
  repoUrl: string;
  repoName: string;
  status: 'success' | 'failed';
  message?: string;
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

/**
 * Publish the current project to a subdomain
 * @param projectId The ID of the project to publish
 * @param subdomain The desired subdomain name
 * @returns Promise with the publishing response
 */
export const publishProject = async (projectId: string, subdomain: string): Promise<PublishResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/publish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ projectId, subdomain }),
    });
    
    if (!response.ok) {
      throw new Error(`Backend returned status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error publishing project:', error);
    throw error;
  }
};

/**
 * Create a GitHub repository for the current project
 * @param projectId The ID of the project
 * @param repoName The name for the GitHub repository
 * @param isPrivate Whether the repository should be private
 * @returns Promise with the GitHub repository creation response
 */
export const createGitHubRepository = async (
  projectId: string, 
  repoName: string,
  isPrivate: boolean = true
): Promise<GitHubRepoResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/create-github-repo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ projectId, repoName, isPrivate }),
    });
    
    if (!response.ok) {
      throw new Error(`Backend returned status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating GitHub repository:', error);
    throw error;
  }
};

/**
 * Get project code files structure
 * @param projectId The ID of the project
 * @returns Promise with the file structure response
 */
export const getProjectFiles = async (projectId: string): Promise<{files: {name: string, path: string, content: string}[]}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/project-files/${projectId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Backend returned status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching project files:', error);
    throw error;
  }
};
