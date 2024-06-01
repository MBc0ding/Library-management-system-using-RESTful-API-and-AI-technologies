import express from 'express';
import {
    getAllCopies,
    getCopyById,
    addCopy,
    updateCopy,
    deleteCopy,
    getAvailableCopies
} from '../controllers/CopyController.js';

const router = express.Router();

router.get('/', getAllCopies);
router.get('/:id', getCopyById);
router.post('/', addCopy);
router.put('/:id', updateCopy);
router.delete('/:id', deleteCopy);
router.get('/NbOfAvailableCopies/:bookId', getAvailableCopies);

export default router;
