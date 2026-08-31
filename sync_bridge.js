const express = require('express');
const axios = require('axios');

const router = express.Router();
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbz1CPviWaISRLeTB6wgSPKSjep78v7a48cHjs5-n9q4sPGUM_jqlWA2aUd2qbhUXKBC/exec";

// 🚀 यह राउट वेबसाइट से आने वाले डेटा को पकड़ेगा और सीधे Google Sheet पर भेज देगा
router.post('/sync-to-sheet', async (req, res) => {
    try {
        const payload = req.body;
        
        if (!payload || Object.keys(payload).length === 0) {
            return res.status(400).json({ status: "ERROR", message: "No data received" });
        }

        // Railway से सीधे Google Sheet को रिक्वेस्ट भेजी जाएगी (यहाँ कोई cURL या DNS ब्लॉक नहीं आएगा)
        const response = await axios.post(GOOGLE_SHEET_URL, payload, {
            headers: { "Content-Type": "application/json" },
            timeout: 15000
        });

        return res.status(200).json({
            status: "SUCCESS",
            message: "Synced to Google Sheet via Railway Bridge",
            google_response: response.data
        });

    } catch (error) {
        console.error("❌ Railway Bridge Sync Error:", error.message);
        return res.status(500).json({ status: "ERROR", message: error.toString() });
    }
});

module.exports = router;