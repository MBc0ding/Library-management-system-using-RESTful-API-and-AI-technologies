import Loan from '../models/Loan.js';

export const getAllLoans = async (req, res) => {
    try {
        const loans = await Loan.getAllLoans();
        res.json(loans);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve loans', error });
    }
};

export const getLoanByMemberId = async (req, res) => {
    try {
        const loan = await Loan.getLoanByMemberId(req.params.id);
        if (loan) {
            res.json(loan);
        } else {
            res.status(404).send({ message: 'Loan not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve loan', error });
    }
};

export const addLoan = async (req, res) => {
    try {
        const loanId = await Loan.addLoan(req.body);
        res.status(201).json({ message: 'Loan added successfully', id: loanId });
    } catch (error) {
        res.status(500).send({ message: 'Failed to add loan', error });
    }
};

export const updateLoan = async (req, res) => {
    const { id } = req.params;
    const { copy_id, member_id, loan_date, due_date, return_date, fine } = req.body;

    try {
        const existingLoan = await Loan.getLoanById(id);
        if (!existingLoan) {
            return res.status(404).send({ message: 'Loan not found' });
        }

        // Merge the new values with the existing loan details
        const updatedLoan = {
            ...existingLoan,
            copy_id: copy_id !== undefined ? copy_id : existingLoan.copy_id,
            member_id: member_id !== undefined ? member_id : existingLoan.member_id,
            loan_date: loan_date !== undefined ? loan_date : existingLoan.loan_date,
            due_date: due_date !== undefined ? due_date : existingLoan.due_date,
            return_date: return_date !== undefined ? return_date : existingLoan.return_date,
            fine: fine !== undefined ? fine : existingLoan.fine
        };

        const affectedRows = await Loan.updateLoan(id, updatedLoan);
        if (affectedRows > 0) {
            res.send({ message: 'Loan updated successfully' });
        } else {
            res.status(404).send({ message: 'Loan not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Failed to update loan', error });
    }
};

export const deleteLoan = async (req, res) => {
    try {
        const deletedRows = await Loan.deleteLoan(req.params.id);
        if (deletedRows) {
            res.send({ message: 'Loan deleted successfully' });
        } else {
            res.status(404).send({ message: 'Loan not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete loan', error });
    }
};
