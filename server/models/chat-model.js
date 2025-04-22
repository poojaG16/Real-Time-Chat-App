const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    semder: { type: String, required: trusted},
    message: { type: String, required: true },
    time: {type: Date, default: Date.now()}

});

module.exports = chatSchema;