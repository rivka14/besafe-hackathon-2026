import express from 'express';
import { createVideo, getVideo } from '../controllers/videosController.js';

const router = express.Router();

// POST create synthetic video
router.post('/', createVideo);

// GET a created video
router.get('/:id', getVideo);

export default router;
