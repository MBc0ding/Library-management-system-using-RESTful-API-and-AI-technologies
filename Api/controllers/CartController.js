import Cart from '../models/Cart.js';

export const getCartItemsByMemberId = async (req, res) => {
    try {
        const items = await Cart.getAllItemsByMemberId(req.params.member_id);
        res.json(items);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve cart items', error });
    }
};

export const addItemToCart = async (req, res) => {
    try {
        const { member_id, book_id } = req.params;
        const cartId = await Cart.addItem(member_id, book_id);
        res.status(201).json({ message: 'Item added to cart successfully', id: cartId });
    } catch (error) {
        res.status(500).send({ message: 'Failed to add item to cart', error });
    }
};

export const clearCartByMemberId = async (req, res) => {
    try {
        const affectedRows = await Cart.clearCartByMemberId(req.params.member_id);
        if (affectedRows) {
            res.send({ message: 'Cart cleared successfully' });
        } else {
            res.status(404).send({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Failed to clear cart', error });
    }
};

export const removeCartItem = async (req, res) => {
    try {
        const { member_id, book_id } = req.params;
        const result = await Cart.RemoveCartItem(member_id, book_id);
        if (result) {
            res.send({ message: 'Item removed from cart successfully' });
        } else {
            res.status(404).send({ message: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Failed to remove item from cart', error });
    }
};
