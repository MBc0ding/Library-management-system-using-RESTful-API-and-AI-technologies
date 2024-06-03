import express from 'express';
import {
    getCartItemsByMemberId,
    addItemToCart,
    clearCartByMemberId,
    removeCartItem
} from '../controllers/CartController.js';

const router = express.Router();

router.get('/member/:member_id', getCartItemsByMemberId);
router.post('/member/:member_id/book/:book_id', addItemToCart);
router.delete('/member/:member_id', clearCartByMemberId);
router.delete('/member/:member_id/book/:book_id', removeCartItem);

export default router;
