const mongoose = require('mongoose');

const EpisodeSchema = new mongoose.Schema(
    {
        movieId: { type: String, required: true },
        episode: { type: Number, required: true },
        video: { type: Object },
        trailer: { type: String },
        banner: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model('episode', EpisodeSchema);
