import Member from '../models/member.js';

export const getAllMembers = async (req, res) => {
    try {
        const members = await Member.getAllMembers();
        res.json(members);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve members', error });
    }
};

export const getMemberById = async (req, res) => {
    try {
        const member = await Member.getMemberById(req.params.id);
        if (member) {
            res.json(member);
        } else {
            res.status(404).send({ message: 'Member not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve member', error });
    }
};

export const addMember = async (req, res) => {
    try {
        const newMember = req.body;
        const memberId = await Member.create(newMember);
        res.status(201).json({ message: 'Member added successfully', id: memberId });
    } catch (error) {
        res.status(500).send({ message: 'Failed to add member', error });
    }
};

export const updateMember = async (req, res) => {
    try {
        const updatedMember = req.body;
        const result = await Member.update(req.params.id, updatedMember);
        if (result > 0) {
            res.send({ message: 'Member updated successfully' });
        } else {
            res.status(404).send({ message: 'Member not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Failed to update member', error });
    }
};

export const deleteMember = async (req, res) => {
    try {
        const result = await Member.delete(req.params.id);
        if (result > 0) {
            res.send({ message: 'Member deleted successfully' });
        } else {
            res.status(404).send({ message: 'Member not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete member', error });
    }
};

export const authenticate = async (req, res) => {
    try {
        const { email, password } = req.body;
        const member = await Member.authenticate(email, password);
        if (member) {
            res.json({ message: 'Authentication successful', member });
        } else {
            res.status(401).send({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Failed to authenticate member', error });
    }
};
