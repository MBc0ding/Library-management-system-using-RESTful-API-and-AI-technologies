import React, { useContext, useEffect } from "react";
import { LoanHistoryContext, UserContext } from '../../App';
import Navbar from '../../components/layouts/navbar/Navbar';
import Footer from '../../components/layouts/footer/Footer';
import api from '../../services/api'; // Make sure the path is correct
import './loanHistoryPage.styles.css';

const LoanHistoryPage = () => {
    const { loanHistory, setLoanHistory } = useContext(LoanHistoryContext);
    const { authenticatedUser } = useContext(UserContext);

    useEffect(() => {
        const fetchLoanHistory = async () => {
            try {
                const response = await api.get(`/library-api/loan/member/${authenticatedUser.id.id}`);
                setLoanHistory(response.data);
            } catch (error) {
                console.error("Error fetching loan history:", error);
            }
        };

        if (authenticatedUser) {
            fetchLoanHistory();
        }
    }, [authenticatedUser, setLoanHistory]);

    const handleReturn = async (id, copyId) => {
        const formattedDate = new Date().toISOString().split('T')[0]; // Correctly format the date as "YYYY-MM-DD"
        try {
            await api.put(`/library-api/loan/${id}`, { return_date: formattedDate });
            await api.put(`/library-api/copy/${copyId}`, { status: 'available' }); // Update the copy status to 'available'
            setLoanHistory(prevHistory =>
                prevHistory.map(loan => (loan.id === id ? { ...loan, return_date: formattedDate } : loan))
            );
            alert("Book returned successfully.");
        } catch (error) {
            console.error("Error returning book:", error);
            alert("An error occurred while returning the book.");
        }
    };

    return (
        <section>
            <Navbar darkTheme={true} />

            <div className="loan-history-container">
                <div className="container">
                    <h2>Your Loan History</h2>

                    {Array.isArray(loanHistory) && loanHistory.length === 0 ? (
                        <p>No loans to show.</p>
                    ) : (
                        <table className="loan-history-table">
                            <thead>
                                <tr>
                                    <th>Book Title</th>
                                    <th>Loan Date</th>
                                    <th>Due Date</th>
                                    <th>Return Date</th>
                                    <th>Fine</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(loanHistory) && loanHistory.map((item) => (
                                    <tr key={item.id} className="loan-item">
                                        <td>{item.book_title}</td>
                                        <td>{new Date(item.loan_date).toLocaleDateString()}</td>
                                        <td>{new Date(item.due_date).toLocaleDateString()}</td>
                                        <td>{item.return_date ? new Date(item.return_date).toLocaleDateString() : 'Not Returned'}</td>
                                        <td>{item.fine ? `$${item.fine}` : 'None'}</td>
                                        <td>
                                            {item.return_date ? (
                                                'Returned'
                                            ) : (
                                                <button onClick={() => handleReturn(item.id, item.copy_id)} className="button-secondary">Return</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <Footer />
        </section>
    );
};

export default LoanHistoryPage;
