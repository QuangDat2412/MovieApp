const router = require('express').Router();
const Episode = require('../models/Episode');
const { verifyTokenAndAdmin } = require('./verifyToken');

//ADD
router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const newEpisode = new Episode(req.body);
    console.log(newEpisode);
    try {
        const savedEpisode = await newEpisode.save();
        console.log(savedEpisode);
        res.status(200).json(savedEpisode);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});
//UPDATE
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedEpisode = await Episode.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedEpisode);
    } catch (err) {
        res.status(500).json(err);
    }
});
// Delete
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Episode.findByIdAndDelete(req.params.id);
        res.status(200).json('Movie has been deleted...');
    } catch (err) {
        res.status(500).json(err);
    }
});
// delete parent
router.delete('/movie/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Episode.deleteMany({ movieId: req.params.id });
        res.status(200).json('Movie has been deleted...');
    } catch (err) {
        res.status(500).json(err);
    }
});
// Get by id
router.get('/episode/:id', async (req, res) => {
    try {
        const episode = await Episode.findById(req.params.id);
        const { video, ...others } = episode;
        res.status(200).json(video);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET RANDOM

// router.get('/random', verifyTokenAndAdmin, async (req, res) => {
//     const type = req.query.type;
//     let movie;
//     try {
//         if (type === 'series') {
//             movie = await Movie.aggregate([{ $match: { isSeries: true } }, { $sample: { size: 1 } }]);
//         } else {
//             movie = await Movie.aggregate([{ $match: { isSeries: false } }, { $sample: { size: 1 } }]);
//         }
//         res.status(200).json(movie);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

//GET ALL

router.get('/', async (req, res) => {
    try {
        const episodes = await Episode.find();
        res.status(200).json(episodes.reverse());
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
