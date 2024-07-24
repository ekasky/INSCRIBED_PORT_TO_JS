const mongoose = require('mongoose');

const blacklistedTokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '1h' }
});

const BlacklistedToken = mongoose.model('BlacklistedToken', blacklistedTokenSchema);

module.exports = BlacklistedToken;