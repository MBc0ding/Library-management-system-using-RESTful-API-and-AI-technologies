import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import './ViewCopies.styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ViewCopies = () => {
    const [copies, setCopies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCopies = async () => {
            try {
                const response = await api.get('/library-api/copy');
                setCopies(response.data);
            } catch (error) {
                console.error('Error fetching copies:', error);
            }
        };

        fetchCopies();
    }, []);

    const handleModify = (copyId) => {
        navigate(`/admin-dashboard/modify-copy/${copyId}`);
    };

    const handleDelete = async (copyId) => {
        try {
            await api.delete(`/library-api/copy/${copyId}`);
            setCopies(copies.filter((copy) => copy.id !== copyId));
            alert('Copy deleted successfully');
        } catch (error) {
            console.error('Error deleting copy:', error);
            alert('Failed to delete copy');
        }
    };

    return (
        <div className="view-copies-container">
            <h2>Copies List</h2>
            <table className="copies-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Copy ID</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {copies.map((copy) => (
                        <tr key={copy.id}>
                            <td>{copy.title}</td>
                            <td>{copy.id}</td>
                            <td>{copy.status}</td>
                            <td>
                                <button className="action-button modify" onClick={() => handleModify(copy.id)}>
                                    <FontAwesomeIcon icon={faEdit} /> Modify
                                </button>
                                <button className="action-button delete" onClick={() => handleDelete(copy.id)}>
                                    <FontAwesomeIcon icon={faTrash} /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewCopies;
