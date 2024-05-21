import Loan from '../models/Loan.js';

export async function getAllLoans(req, res) {
  try {
    const loans = await Loan.getAllLoans();
    res.json(loans);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send({ message: 'Failed to retrieve loans', error });
  }
}

export async function getLoanById(req, res) {
  const { id } = req.params;
  try {
    const loan = await Loan.getLoanById(id);
    if (loan) {
      res.json(loan);
    } else {
      res.status(404).send({ message: 'Loan not found' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send({ message: 'Failed to retrieve loan', error });
  }
}

export async function addLoan(req, res) {
  const { book_id, member_id, loan_date, due_date, return_date, fines } = req.body;
  if (!book_id || !member_id || !loan_date || !due_date) {
    res.status(400).send({ message: 'Missing required fields' });
    return;
  }

  try {
    const newLoan = new Loan(null, book_id, member_id, loan_date, due_date, return_date, fines);
    const id = await Loan.addLoan(newLoan);
    res.status(201).json({ message: 'Loan added successfully', id });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send({ message: 'Failed to add loan', error });
  }
}

export async function updateLoan(req, res) {
  const { id } = req.params;
  const { book_id, member_id, loan_date, due_date, return_date, fines } = req.body;

  try {
    const existingLoan = await Loan.getLoanById(id);
    if (!existingLoan) {
      return res.status(404).send({ message: 'Loan not found' });
    }

    const updatedLoan = {
      ...existingLoan,
      book_id: book_id !== undefined ? book_id : existingLoan.book_id,
      member_id: member_id !== undefined ? member_id : existingLoan.member_id,
      loan_date: loan_date !== undefined ? loan_date : existingLoan.loan_date,
      due_date: due_date !== undefined ? due_date : existingLoan.due_date,
      return_date: return_date !== undefined ? return_date : existingLoan.return_date,
      fines: fines !== undefined ? fines : existingLoan.fines
    };

    const affectedRows = await Loan.updateLoan(id, updatedLoan);
    if (affectedRows > 0) {
      res.send({ message: 'Loan updated successfully' });
    } else {
      res.status(404).send({ message: 'Loan not found' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send({ message: 'Failed to update loan', error });
  }
}

export async function deleteLoan(req, res) {
  const { id } = req.params;
  try {
    const existingLoan = await Loan.getLoanById(id);
    if (!existingLoan) {
      return res.status(404).send({ message: 'Loan not found' });
    }

    const affectedRows = await Loan.deleteLoan(id);
    if (affectedRows > 0) {
      res.send({ message: 'Loan deleted successfully' });
    } else {
      res.status(404).send({ message: 'Loan not found' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send({ message: 'Failed to delete loan', error });
  }
}
