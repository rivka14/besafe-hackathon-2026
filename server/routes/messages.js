import express from 'express';
import {
    createMessage,
    getAllMessages,
    getSingleMessage,
    getRandomMessage,
    incrementFallCount,
} from '../controllers/messagesController.js';

const router = express.Router();

/**
 * Read Only Permission Routes
 */
// GET all messages
router.get('/', getAllMessages)

// GET a random message
router.get('/random', getRandomMessage);

// GET a single message
router.get('/:id', getSingleMessage)

/**
 * Read and Write Permission Routes
 */
// POST a new message
router.post('/', createMessage)

// Increment fall count when someone clicks a fake link
router.post('/:id/fall', incrementFallCount)

export default router;