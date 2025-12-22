import express from 'express';
import {
    addMessage,
    getAllMessages,
    // getSingleDuck,
    // deleteDuck,
    // updateDuck,
    // getRandomDuck,
} from '../controllers/messagesController.js';

const router = express.Router();

/**
 * Read Only Permission Routes
 */
// GET all ducks
router.get('/', getAllMessages)

// // GET a random duck
// router.get('/random', getRandomDuck);

// // GET a single duck
// router.get('/:id', getSingleDuck)

/**
 * Read and Write Permission Routes
 */
// POST a new duck
router.post('/', addMessage)

// // DELETE a duck
// router.delete('/:id', deleteDuck)

// // UPDATE a duck
// router.patch('/:id', updateDuck)

export default router;