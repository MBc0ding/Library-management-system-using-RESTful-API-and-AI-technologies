import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import './ModifyCopy.styles.css';

const ModifyCopy = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [copy, setCopy] = useState({
        id: '',
        status: ''
    });

    useEffect(() => {
        const fetchCopy = async () => {
            try {
                const response = await api.get(`/library-api/copy/${id}`);
                setCopy(response.data);
            } catch (error) {
                console.error('Error fetching copy:', error);
            }
        };

        fetchCopy();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCopy({ ...copy, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/library-api/copy/${id}`, copy);
            alert('Copy updated successfully');
            navigate('/admin-dashboard/view-copies');
        } catch (error) {
            console.error('Error updating copy:', error);
            alert('Failed to update copy');
        }
    };

    return (
        <div className="modify-copy-container">
            <h2>Modify Copy</h2>
            <form onSubmit={handleSubmit}>
                <div className="modifycopy-form-group">
                    <label>Copy ID</label>
                    <input type="text" name="id" value={copy.id} onChange={handleInputChange} readOnly />
                </div>
                <div className="modifycopy-form-group">
                    <label>Status</label>
                    <select name="status" value={copy.status} onChange={handleInputChange} required>
                        <option value="available">available</option>
                        <option value="not available">not available</option>
                    </select>
                </div>
                <button type="submit" className="modifycopy-submit-button">Update Copy</button>
            </form>
        </div>
    );
};

export default ModifyCopy;
