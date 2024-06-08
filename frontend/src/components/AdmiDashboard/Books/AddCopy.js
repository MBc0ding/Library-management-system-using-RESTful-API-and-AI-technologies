import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import './AddCopy.styles.css';

const AddCopy = () => {
    const { bookId } = useParams();
    const [numberOfCopies, setNumberOfCopies] = useState(1);
    const navigate = useNavigate();

    const handleAddCopies = async () => {
        try {

           // console.log("book_id: ",bookId);
            for (let i = 0; i < numberOfCopies; i++) {
                await api.post('/library-api/copy', { book_id: bookId});
            }
            alert('Copies added successfully!');
            navigate('/admin-dashboard/view-books');
        } catch (error) {
            console.error('Error adding copies:', error);
            alert('Failed to add copies');
        }
    };

    return (
        <div className="add-copy-container">
            <h2>Add Copies</h2>
            <div className="addcopy-form-group">
                <label>Number of Copies</label>
                <input
                    type="number"
                    value={numberOfCopies}
                    onChange={(e) => setNumberOfCopies(e.target.value)}
                    min="1"
                    required
                />
            </div>
            <button onClick={handleAddCopies} className="addcopy-confirm-button">Confirm</button>
        </div>
    );
};

export default AddCopy;
