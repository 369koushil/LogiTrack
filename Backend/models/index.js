const mongoose = require("mongoose");
require('dotenv').config();

const uri = process.env.MONGO_URI;

async function main() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connection to MongoDB successful");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

module.exports = { main };
