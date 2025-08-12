// routes/testRoutes.js
const express = require("express");
const { addTestScore, getUserTestScores, getUserPerformanceData } = require("../controllers/testController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add-score", protect, addTestScore);
router.get("/scores", protect, getUserTestScores);
router.get("/performance", protect, getUserPerformanceData); // Ensure this is a GET route
router.get("/health", (req, res) => {
    res.json({ 
      success: true,
      message: "Test API is working" 
    });
  });
  
module.exports = router;
