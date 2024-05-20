import Member from '../models/member.js';

export async function getAllMembers(req, res) {
    try {
        const members = await Member.getAllMembers();
        res.json(members);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send({ message: 'Failed to retrieve members', error });
    }
}

export async function getMemberById(req, res) {
    const { id } = req.params;
    try {
        const member = await Member.getMemberById(id);
        if (member) {
            res.json(member);
        } else {
            res.status(404).send({ message: 'Member not found' });
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send({ message: 'Failed to retrieve member', error });
    }
}

export async function addMember(req, res) {
    const { name, address, contact_details } = req.body;
    if (!name || !address || !contact_details) {
        res.status(400).send({ message: 'Missing required fields' });
        return;
    }

    try {
        const newMember = new Member(null, name, address, contact_details);
        const id = await Member.addMember(newMember);
        res.status(201).json({ message: 'Member added successfully', id });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send({ message: 'Failed to add member', error });
    }
}

export async function updateMember(req, res) {
    const { id } = req.params;
    const { name, address, contact_details } = req.body;

    try {
        const existingMember = await Member.getMemberById(id);
        if (!existingMember) {
            return res.status(404).send({ message: 'Member not found' });
        }

        const updatedMember = {
            ...existingMember,
            name: name !== undefined ? name : existingMember.name,
            address: address !== undefined ? address : existingMember.address,
            contact_details: contact_details !== undefined ? contact_details : existingMember.contact_details
        };

        const affectedRows = await Member.updateMember(id, updatedMember);
        if (affectedRows > 0) {
            res.send({ message: 'Member updated successfully' });
        } else {
            res.status(404).send({ message: 'Member not found' });
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send({ message: 'Failed to update member', error });
    }
}

export async function deleteMember(req, res) {
    const { id } = req.params;
    try {
        const existingMember = await Member.getMemberById(id);
        if (!existingMember) {
            return res.status(404).send({ message: 'Member not found' });
        }

        const affectedRows = await Member.deleteMember(id);
        if (affectedRows > 0) {
            res.send({ message: 'Member deleted successfully' });
        } else {
            res.status(404).send({ message: 'Member not found' });
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send({ message: 'Failed to delete member', error });
    }
}
