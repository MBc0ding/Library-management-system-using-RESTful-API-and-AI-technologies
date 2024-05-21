import { expect } from 'chai';
import sinon from 'sinon';
import * as LoanController from '../controllers/LoanController.js';
import Loan from '../models/Loan.js';

describe('LoanController', function() {
  afterEach(function() {
    sinon.restore();
  });

  describe('getAllLoans', function() {
    it('should return all loans', async function() {
      const loans = [{ loan_id: 1, book_id: 1, member_id: 1 }, { loan_id: 2, book_id: 2, member_id: 2 }];
      sinon.stub(Loan, 'getAllLoans').resolves(loans);

      const req = {};
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await LoanController.getAllLoans(req, res);

      expect(res.json.calledWith(loans)).to.be.true;
    });

    it('should handle errors', async function() {
      const error = new Error('Database error');
      sinon.stub(Loan, 'getAllLoans').rejects(error);

      const req = {};
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await LoanController.getAllLoans(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: 'Failed to retrieve loans', error })).to.be.true;
    });
  });

  describe('getLoanById', function() {
    it('should return the loan with the given ID', async function() {
      const loan = { loan_id: 1, book_id: 1, member_id: 1 };
      sinon.stub(Loan, 'getLoanById').resolves(loan);

      const req = { params: { id: 1 } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await LoanController.getLoanById(req, res);

      expect(res.json.calledWith(loan)).to.be.true;
    });

    it('should return 404 if the loan is not found', async function() {
      sinon.stub(Loan, 'getLoanById').resolves(null);

      const req = { params: { id: 1 } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await LoanController.getLoanById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.send.calledWith({ message: 'Loan not found' })).to.be.true;
    });

    it('should handle errors', async function() {
      const error = new Error('Database error');
      sinon.stub(Loan, 'getLoanById').rejects(error);

      const req = { params: { id: 1 } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await LoanController.getLoanById(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: 'Failed to retrieve loan', error })).to.be.true;
    });
  });

  describe('addLoan', function() {
    it('should add a new loan', async function() {
      const loan = { loan_id: 1, book_id: 1, member_id: 1, loan_date: '2023-05-01', due_date: '2023-05-15', return_date: null, fines: 0.0 };
      sinon.stub(Loan, 'addLoan').resolves(loan.loan_id);

      const req = {
        body: { book_id: 1, member_id: 1, loan_date: '2023-05-01', due_date: '2023-05-15', return_date: null, fines: 0.0 }
      };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await LoanController.addLoan(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ message: 'Loan added successfully', id: loan.loan_id })).to.be.true;
    });

    it('should handle errors', async function() {
      const error = new Error('Database error');
      sinon.stub(Loan, 'addLoan').rejects(error);

      const req = {
        body: { book_id: 1, member_id: 1, loan_date: '2023-05-01', due_date: '2023-05-15', return_date: null, fines: 0.0 }
      };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await LoanController.addLoan(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: 'Failed to add loan', error })).to.be.true;
    });
  });

  describe('updateLoan', function() {
    it('should update an existing loan', async function() {
      const loan = { loan_id: 1, book_id: 1, member_id: 1, loan_date: '2023-05-01', due_date: '2023-05-15', return_date: null, fines: 0.0 };
      sinon.stub(Loan, 'updateLoan').resolves(1);
      sinon.stub(Loan, 'getLoanById').resolves(loan);

      const req = {
        params: { id: 1 },
        body: { book_id: 1, member_id: 1, loan_date: '2023-05-01', due_date: '2023-05-15', return_date: null, fines: 0.0 }
      };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await LoanController.updateLoan(req, res);

      expect(res.send.calledWith({ message: 'Loan updated successfully' })).to.be.true;
    });

    it('should handle errors', async function() {
      const error = new Error('Database error');
      sinon.stub(Loan, 'updateLoan').rejects(error);
      sinon.stub(Loan, 'getLoanById').resolves({ loan_id: 1 });

      const req = {
        params: { id: 1 },
        body: { book_id: 1, member_id: 1, loan_date: '2023-05-01', due_date: '2023-05-15', return_date: null, fines: 0.0 }
      };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await LoanController.updateLoan(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: 'Failed to update loan', error })).to.be.true;
    });
  });

  describe('deleteLoan', function() {
    it('should delete a loan', async function() {
      sinon.stub(Loan, 'deleteLoan').resolves(1);
      sinon.stub(Loan, 'getLoanById').resolves({ loan_id: 1 });

      const req = { params: { id: 1 } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await LoanController.deleteLoan(req, res);

      expect(res.send.calledWith({ message: 'Loan deleted successfully' })).to.be.true;
    });

    it('should handle errors', async function() {
      const error = new Error('Database error');
      sinon.stub(Loan, 'deleteLoan').rejects(error);
      sinon.stub(Loan, 'getLoanById').resolves({ loan_id: 1 });

      const req = { params: { id: 1 } };
      const res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(),
        send: sinon.spy()
      };

      await LoanController.deleteLoan(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.send.calledWith({ message: 'Failed to delete loan', error })).to.be.true;
    });
  });
});
