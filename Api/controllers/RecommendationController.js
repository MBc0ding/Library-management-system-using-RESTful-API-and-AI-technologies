import Recommendation from '../models/Recommendation.js';

export const getAllRecommendations = async (req, res) => {
    try {
        const recommendations = await Recommendation.getAllRecommendations();
        res.json(recommendations);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve recommendations', error });
    }
};

export const getRecommendationById = async (req, res) => {
    try {
        const recommendation = await Recommendation.getRecommendationById(req.params.id);
        if (recommendation) {
            res.json(recommendation);
        } else {
            res.status(404).send({ message: 'Recommendation not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve recommendation', error });
    }
};

export const addRecommendation = async (req, res) => {
    try {
        const recommendationId = await Recommendation.addRecommendation(req.body);
        res.status(201).json({ message: 'Recommendation added successfully', id: recommendationId });
    } catch (error) {
        res.status(500).send({ message: 'Failed to add recommendation', error });
    }
};

export const updateRecommendation = async (req, res) => {
    try {
        const updatedRows = await Recommendation.updateRecommendation(req.params.id, req.body);
        if (updatedRows) {
            res.send({ message: 'Recommendation updated successfully' });
        } else {
            res.status(404).send({ message: 'Recommendation not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Failed to update recommendation', error });
    }
};

export const deleteRecommendation = async (req, res) => {
    try {
        const deletedRows = await Recommendation.deleteRecommendation(req.params.id);
        if (deletedRows) {
            res.send({ message: 'Recommendation deleted successfully' });
        } else {
            res.status(404).send({ message: 'Recommendation not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete recommendation', error });
    }
};
