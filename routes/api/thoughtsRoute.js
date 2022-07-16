const router = require('express').Router();

const {
    createThoughts,
    getAllThoughts,
    getThoughtsById,
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtsController');

// /api/thoughts/
router.route('/')
.get(getAllThoughts)

// api/thoughts/:userId
router.route('/:userId')
.post(createThoughts)

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
.get(getThoughtsById)
.put(updateThoughts)
.delete(deleteThoughts)

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
.post(addReaction)

// /api/thoughts/:thoughtId/reactions/:reactionId

router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction)

module.exports = router;