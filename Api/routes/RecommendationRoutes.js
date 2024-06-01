import express from 'express';
import * as RecommendationController from '../controllers/RecommendationController.js';

const router = express.Router();

router.get('/', RecommendationController.getAllRecommendations);
router.get('/:id', RecommendationController.getRecommendationById);
router.post('/', RecommendationController.addRecommendation);
router.put('/:id', RecommendationController.updateRecommendation);
router.delete('/:id', RecommendationController.deleteRecommendation);

export default router;
