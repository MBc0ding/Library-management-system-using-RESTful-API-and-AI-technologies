import { expect } from 'chai';
import sinon from 'sinon';
import * as RecommendationController from '../controllers/RecommendationController.js';
import Recommendation from '../models/Recommendation.js';

describe('RecommendationController', function() {
  afterEach(function() {
    sinon.restore(); // Restore all stubs after each test
  });

  describe('getAllRecommendations', function() {
    it('should return all recommendations', async function() {
      const recommendations = [{ recommendation_id: 1, member_id: 1, recommended_book_ids: '1,2', reasons: 'Great books!' }];
      sinon.stub(Recommendation, 'getAllRecommendations').resolves(recommendations);

      const req = {};
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await RecommendationController.getAllRecommendations(req, res);

      expect(res.json.calledWith(recommendations)).to.be.true;
    });

    it('should handle errors', async function() {
      const error = new Error('Database error');
      sinon.stub(Recommendation, 'getAllRecommendations').rejects(error);

      const req = {};
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await RecommendationController.getAllRecommendations(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: 'Failed to retrieve recommendations', error })).to.be.true;
    });
  });

  describe('getRecommendationById', function() {
    it('should return the recommendation with the given ID', async function() {
      const recommendation = { recommendation_id: 1, member_id: 1, recommended_book_ids: '1,2', reasons: 'Great books!' };
      sinon.stub(Recommendation, 'getRecommendationById').resolves(recommendation);

      const req = { params: { id: 1 } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await RecommendationController.getRecommendationById(req, res);

      expect(res.json.calledWith(recommendation)).to.be.true;
    });

    it('should return 404 if the recommendation is not found', async function() {
      sinon.stub(Recommendation, 'getRecommendationById').resolves(null);

      const req = { params: { id: 1 } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await RecommendationController.getRecommendationById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.send.calledWith({ message: 'Recommendation not found' })).to.be.true;
    });

    it('should handle errors', async function() {
      const error = new Error('Database error');
      sinon.stub(Recommendation, 'getRecommendationById').rejects(error);

      const req = { params: { id: 1 } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await RecommendationController.getRecommendationById(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: 'Failed to retrieve recommendation', error })).to.be.true;
    });
  });

  describe('addRecommendation', function() {
    it('should add a new recommendation', async function() {
      const recommendation = { recommendation_id: 1, member_id: 1, recommended_book_ids: '1,2', reasons: 'Great books!' };
      sinon.stub(Recommendation, 'addRecommendation').resolves(recommendation.recommendation_id);

      const req = {
        body: { member_id: 1, recommended_book_ids: '1,2', reasons: 'Great books!' }
      };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await RecommendationController.addRecommendation(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ message: 'Recommendation added successfully', id: recommendation.recommendation_id })).to.be.true;
    });

    it('should handle errors', async function() {
      const error = new Error('Database error');
      sinon.stub(Recommendation, 'addRecommendation').rejects(error);

      const req = {
        body: { member_id: 1, recommended_book_ids: '1,2', reasons: 'Great books!' }
      };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await RecommendationController.addRecommendation(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: 'Failed to add recommendation', error })).to.be.true;
    });
  });

  describe('updateRecommendation', function() {
    it('should update an existing recommendation', async function() {
      const recommendation = { recommendation_id: 1, member_id: 1, recommended_book_ids: '1,2', reasons: 'Great books!' };
      sinon.stub(Recommendation, 'updateRecommendation').resolves(1);
      sinon.stub(Recommendation, 'getRecommendationById').resolves(recommendation);

      const req = {
        params: { id: 1 },
        body: { member_id: 1, recommended_book_ids: '1,2', reasons: 'Updated reasons' }
      };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await RecommendationController.updateRecommendation(req, res);

      expect(res.send.calledWith({ message: 'Recommendation updated successfully' })).to.be.true;
    });

    it('should handle errors', async function() {
      const error = new Error('Database error');
      sinon.stub(Recommendation, 'updateRecommendation').rejects(error);
      sinon.stub(Recommendation, 'getRecommendationById').resolves({ recommendation_id: 1 });

      const req = {
        params: { id: 1 },
        body: { member_id: 1, recommended_book_ids: '1,2', reasons: 'Updated reasons' }
      };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await RecommendationController.updateRecommendation(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: 'Failed to update recommendation', error })).to.be.true;
    });
  });

  describe('deleteRecommendation', function() {
    it('should delete a recommendation', async function() {
      sinon.stub(Recommendation, 'deleteRecommendation').resolves(1);
      sinon.stub(Recommendation, 'getRecommendationById').resolves({ recommendation_id: 1 });

      const req = { params: { id: 1 } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await RecommendationController.deleteRecommendation(req, res);

      expect(res.send.calledWith({ message: 'Recommendation deleted successfully' })).to.be.true;
    });

    it('should handle errors', async function() {
      const error = new Error('Database error');
      sinon.stub(Recommendation, 'deleteRecommendation').rejects(error);
      sinon.stub(Recommendation, 'getRecommendationById').resolves({ recommendation_id: 1 });

      const req = { params: { id: 1 } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await RecommendationController.deleteRecommendation(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: 'Failed to delete recommendation', error })).to.be.true;
    });
  });
});

