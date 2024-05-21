import express from 'express';
import * as LoanController from '../controllers/LoanController.js';

const router = express.Router();

router.get('/', LoanController.getAllLoans);
router.get('/:id', LoanController.getLoanById);
router.post('/', LoanController.addLoan);
router.put('/:id', LoanController.updateLoan);
router.delete('/:id', LoanController.deleteLoan);

export default router;
