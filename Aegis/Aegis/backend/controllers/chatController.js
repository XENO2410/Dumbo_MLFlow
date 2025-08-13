// backend/controllers/chatController.js

const axios = require('axios');

// This function will handle all chat requests
const handleChatRequest = async (req, res) => {
  try {
    const { agentId, messages } = req.body;
    console.log("✅ Attempting to call Python service at http://localhost:5001/invoke-codegpt");

    // Call the Python service running on port 5001
    const pythonServiceResponse = await axios.post(
      'http://localhost:5001/invoke-codegpt',
      {
        agentId: agentId,
        messages: messages,
      }
    );

    // Send the response from the Python service back to your frontend
    res.status(200).json(pythonServiceResponse.data);

  } catch (error) {
    console.error('Error calling Python service:', error.message);
    res.status(500).json({ error: 'Failed to get response from the AI service.' });
  }
};

module.exports = { handleChatRequest };