import Loan from '../models/Loan.js';

export const getAllLoans = async (req, res) => {
    try {
        const loans = await Loan.getAllLoans();
        for (let loan of loans) {
            loan.fine = Loan.calculateFine(loan.due_date, loan.return_date);
        }
        res.json(loans);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve loans', error });
    }
};

export const getLoanByMemberId = async (req, res) => {
    try {
        const loans = await Loan.getLoanByMemberId(req.params.id);
        for (let loan of loans) {
            loan.fine = Loan.calculateFine(loan.due_date, loan.return_date);
        }
        res.json(loans);
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve loans', error });
    }
};

export const addLoan = async (req, res) => {
    try {
        const memberId = req.body.member_id;
        const currentLoans = await Loan.Check_NbOfLoans(memberId);

        if (currentLoans >= 3) {
            return res.status(400).send({ message: 'You cannot borrow more than 3 books at a time.' });
        }

        const loanId = await Loan.addLoan(req.body);
        await Loan.updateFine(loanId); // Update fine after adding loan
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

        const updatedLoan = {
            ...existingLoan,
            copy_id: copy_id !== undefined ? copy_id : existingLoan.copy_id,
            member_id: member_id !== undefined ? member_id : existingLoan.member_id,
            loan_date: loan_date !== undefined ? loan_date : existingLoan.loan_date,
            due_date: due_date !== undefined ? due_date : existingLoan.due_date,
            return_date: return_date !== undefined ? return_date : existingLoan.return_date,
            fine: fine !== undefined ? fine : Loan.calculateFine(existingLoan.due_date, existingLoan.return_date)
        };

        const affectedRows = await Loan.updateLoan(id, updatedLoan);
        if (affectedRows > 0) {
            await Loan.updateFine(id); // Update fine after updating loan
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

export const checkNbOfLoans = async (req, res) => {
    try {
        const memberId = req.params.id;
        const loanCount = await Loan.Check_NbOfLoans(memberId);
        res.json({ memberId, loanCount });
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve loan count', error });
    }
};
