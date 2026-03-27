const mongoose = require('mongoose');

// PASTE YOUR EXACT URI HERE inside the quotes. 
// Do not use process.env.MONGODB_URI for this test.
const uri = "mongodb+srv://<YOUR_USERNAME>:<YOUR_PASSWORD>@cluster0.3kv6qtb.mongodb.net/?retryWrites=true&w=majority";

console.log("Attempting to connect...");

mongoose.connect(uri)
    .then(() => {
        console.log("✅ SUCCESS: The credentials work! The issue is in your server.js or .env setup.");
        process.exit(0);
    })
    .catch((err) => {
        console.error("❌ FAIL: Still bad auth. The issue is definitely inside MongoDB Atlas settings.");
        console.error("Exact error:", err.message);
        process.exit(1);
    });