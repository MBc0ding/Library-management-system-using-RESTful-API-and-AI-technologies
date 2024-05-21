import Recommendation from '../models/Recommendation.js';

export async function getAllRecommendations(req, res) {
  try {
    const recommendations = await Recommendation.getAllRecommendations();
    res.json(recommendations);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send({ message: 'Failed to retrieve recommendations', error });
  }
}

export async function getRecommendationById(req, res) {
  const { id } = req.params;
  try {
    const recommendation = await Recommendation.getRecommendationById(id);
    if (recommendation) {
      res.json(recommendation);
    } else {
      res.status(404).send({ message: 'Recommendation not found' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send({ message: 'Failed to retrieve recommendation', error });
  }
}

export async function addRecommendation(req, res) {
  const { member_id, recommended_book_ids, reasons } = req.body;
  if (!member_id || !recommended_book_ids) {
    res.status(400).send({ message: 'Missing required fields' });
    return;
  }

  try {
    const newRecommendation = new Recommendation(null, member_id, recommended_book_ids, reasons);
    const id = await Recommendation.addRecommendation(newRecommendation);
    res.status(201).json({ message: 'Recommendation added successfully', id });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send({ message: 'Failed to add recommendation', error });
  }
}

export async function updateRecommendation(req, res) {
  const { id } = req.params;
  const { member_id, recommended_book_ids, reasons } = req.body;

  try {
    const existingRecommendation = await Recommendation.getRecommendationById(id);
    if (!existingRecommendation) {
      return res.status(404).send({ message: 'Recommendation not found' });
    }

    const updatedRecommendation = {
      ...existingRecommendation,
      member_id: member_id !== undefined ? member_id : existingRecommendation.member_id,
      recommended_book_ids: recommended_book_ids !== undefined ? recommended_book_ids : existingRecommendation.recommended_book_ids,
      reasons: reasons !== undefined ? reasons : existingRecommendation.reasons
    };

    const affectedRows = await Recommendation.updateRecommendation(id, updatedRecommendation);
    if (affectedRows > 0) {
      res.send({ message: 'Recommendation updated successfully' });
    } else {
      res.status(404).send({ message: 'Recommendation not found' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send({ message: 'Failed to update recommendation', error });
  }
}

export async function deleteRecommendation(req, res) {
  const { id } = req.params;
  try {
    const existingRecommendation = await Recommendation.getRecommendationById(id);
    if (!existingRecommendation) {
      return res.status(404).send({ message: 'Recommendation not found' });
    }

    const affectedRows = await Recommendation.deleteRecommendation(id);
    if (affectedRows > 0) {
      res.send({ message: 'Recommendation deleted successfully' });
    } else {
      res.status(404).send({ message: 'Recommendation not found' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send({ message: 'Failed to delete recommendation', error });
  }
}
