import Copy from '../models/Copy.js';

export const getAllCopies = async (req, res) => {
    try {
        const copies = await Copy.getAllCopies();
        res.json(copies);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve copies', error });
    }
};

export const getCopyById = async (req, res) => {
    try {
        const copy = await Copy.getCopyById(req.params.id);
        if (copy) {
            res.json(copy);
        } else {
            res.status(404).send({ message: 'Copy not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve copy', error });
    }
};

export const addCopy = async (req, res) => {
    try {
        const copyId = await Copy.addCopy(req.body);
        res.status(201).json({ message: 'Copy added successfully', id: copyId });
    } catch (error) {
        res.status(500).send({ message: 'Failed to add copy', error });
    }
};

export const updateCopy = async (req, res) => {
    try {
        const updatedRows = await Copy.updateCopy(req.params.id, req.body);
        if (updatedRows) {
            res.send({ message: 'Copy updated successfully' });
        } else {
            res.status(404).send({ message: 'Copy not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Failed to update copy', error });
    }
};

export const deleteCopy = async (req, res) => {
    try {
        const deletedRows = await Copy.deleteCopy(req.params.id);
        if (deletedRows) {
            res.send({ message: 'Copy deleted successfully' });
        } else {
            res.status(404).send({ message: 'Copy not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete copy', error });
    }
};

export const getAvailableCopies = async (req, res) => {
    try {
        const availableCopies = await Copy.getAvailableCopies(req.params.bookId);
        res.json({ availableCopies });
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve available copies', error });
    }
};