

import express from 'express';
import { executeUserQuery, getHintFromGrok } from '../controllers/queryController.js';

const router = express.Router();

router.post('/execute', executeUserQuery);
router.post('/hint', getHintFromGrok);

export default router;