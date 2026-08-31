const express = require('express');
const axios = require('axios');

const router = express.Router();
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbz1CPviWaISRLeTB6wgSPKSjep78v7a48cHjs5-n9q4sPGUM_jqlWA2aUd2qbhUXKBC/exec";

// 🚀 राउट: वेबसाइट से डेटा लेकर सीधे Google Script को भेजेगा
router.post('/sync-to-sheet', async (req, res) => {
    try {
        console.log("📥 Bridge Received Payload:", req.body);
        const payload = req.body || {};

        if (Object.keys(payload).length === 0) {
            return res.status(400).json({ status: "ERROR", message: "No data received" });
        }

        // Google Script को डेटा फॉरवर्ड करें
        const response = await axios.post(GOOGLE_SHEET_URL, payload, {
            headers: { "Content-Type": "application/json" },
            timeout: 15000
        });

        console.log("✅ Google Script Response:", response.data);

        return res.status(200).json({
            status: "SUCCESS",
            message: "Synced to Google Sheet via Railway",
            data: response.data
        });
    } catch (error) {
        console.error("❌ Sync Error:", error.response ? error.response.data : error.message);
        return res.status(500).json({
            status: "ERROR",
            message: error.message
        });
    }
});

module.exports = router;
