import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import './ViewMembers.styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ViewMembers = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await api.get('/library-api/member');
                setMembers(response.data);
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchMembers();
    }, []);

    const handleDelete = async (memberId) => {
        try {
            await api.delete(`/library-api/member/${memberId}`);
            setMembers(members.filter((member) => member.id !== memberId));
            alert('Member deleted successfully');
        } catch (error) {
            console.error('Error deleting member:', error);
            alert('Failed to delete member');
        }
    };

    return (
        <div className="view-members-container">
            <h2>Members List</h2>
            <table className="members-table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <tr key={member.id}>
                            <td>{member.name}</td>
                            <td>{member.email}</td>
                            <td>
                                <button className="action-button delete" onClick={() => handleDelete(member.id)}>
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

export default ViewMembers;
