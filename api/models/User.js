const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        fullName: { type: String, default: '' },
        phone: { type: String, default: '' },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false },
        isVip: { type: Boolean, default: false },
        favorites: { type: Array },
        history: { type: Array },
        img: { type: String, default: '' },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
