const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }
  return data;
};

// Helper function to create headers with authorization
const createAuthHeaders = (token, includeContent = true) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  if (includeContent) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error(error.message || "Registration failed");
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(error.message || "Login failed");
  }
};

export const getUserProfile = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: createAuthHeaders(token, false),
    });
    const data = await handleResponse(response);
    return data.user;
  } catch (error) {
    console.error("Fetch profile error:", error);
    throw new Error(error.message || "Failed to fetch profile");
  }
};

export const updateUserProfile = async (token, profileData) => {
  try {
    // Handle file upload if avatar is a File object
    if (profileData.avatar instanceof File) {
      const formData = new FormData();
      formData.append('avatar', profileData.avatar);
      formData.append('name', profileData.name);
      formData.append('role', profileData.role);

      const response = await fetch(`${BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      return handleResponse(response);
    }

    // Regular JSON update if no file is involved
    const response = await fetch(`${BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: createAuthHeaders(token),
      body: JSON.stringify(profileData),
    });
    const data = await handleResponse(response);
    return data.user;
  } catch (error) {
    console.error("Update profile error:", error);
    throw new Error(error.message || "Failed to update profile");
  }
};

export const updateAvatar = async (token, avatarFile) => {
  try {
    const formData = new FormData();
    formData.append('avatar', avatarFile);

    const response = await fetch(`${BASE_URL}/auth/profile/avatar`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Avatar update error:", error);
    throw new Error(error.message || "Failed to update avatar");
  }
};

export const deleteAvatar = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/profile/avatar`, {
      method: 'DELETE',
      headers: createAuthHeaders(token),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Delete avatar error:", error);
    throw new Error(error.message || "Failed to delete avatar");
  }
};

// Update these functions in your api.js file

// Function to add a test score
export const addTestScore = async (token, testData) => {
  try {
    const response = await fetch(`${BASE_URL}/tests/add-score`, {
      method: 'POST',
      headers: createAuthHeaders(token),
      body: JSON.stringify({
        testType: testData.testType,
        score: testData.score
      }),
    });
    const data = await handleResponse(response);
    return data.testScores; // Returns the updated array of test scores
  } catch (error) {
    console.error("Add test score error:", error);
    throw new Error(error.message || "Failed to add test score");
  }
};

// Function to get user's test scores
export const getUserTestScores = async (token) => {
  try {
    if (!token) {
      throw new Error('No authentication token provided');
    }

    console.log('Fetching scores with token:', token); // Debug log

    const response = await fetch(`${BASE_URL}/tests/scores`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    console.log('Response status:', response.status); // Debug log

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response data:', data); // Debug log

    // Ensure we're returning an array of test scores
    const scores = data.testScores || [];
    console.log('Processed scores:', scores); // Debug log

    return scores;
  } catch (error) {
    console.error("Fetch test scores error:", error);
    throw error;
  }
};

// Function to get user's performance data for the bar graph
export const getUserPerformanceData = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/tests/performance`, {
      method: 'GET',
      headers: createAuthHeaders(token, false),
    });
    const data = await handleResponse(response);
    return data.performanceData; // Returns the formatted performance data for the graph
  } catch (error) {
    console.error("Fetch performance data error:", error);
    throw new Error(error.message || "Failed to fetch performance data");
  }
};

// New function to check token validity
export const validateToken = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/validate-token`, {
      headers: createAuthHeaders(token, false),
    });
    return response.ok;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};

// New function to refresh token
export const refreshToken = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: createAuthHeaders(token),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Token refresh error:", error);
    throw new Error(error.message || "Failed to refresh token");
  }
};

// New function to handle password change
export const changePassword = async (token, passwordData) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: createAuthHeaders(token),
      body: JSON.stringify(passwordData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Password change error:", error);
    throw new Error(error.message || "Failed to change password");
  }
};