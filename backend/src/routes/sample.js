// Routes for sample endpoints

import express from 'express';
import { getSampleData } from '../controllers/sampleController.js';

const router = express.Router();
router.get('/assignment/:assignmentId/sample', getSampleData);

export default router;