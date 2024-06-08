import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import FormBook from './FormBook';

const ModifyBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bookData, setBookData] = useState(null);

    useEffect(() => {
        const fetchBookData = async () => {
            try {
                const response = await api.get(`/library-api/book/${id}`);
                setBookData(response.data);
            } catch (error) {
                console.error('Failed to fetch book data', error);
            }
        };

        fetchBookData();
    }, [id]);

    const handleModifyBook = async (book) => {
        try {
            await api.put(`/library-api/book/${id}`, book);
            alert('Book modified successfully!');
            navigate('/admin-dashboard/view-books');
        } catch (error) {
            console.error('Failed to modify book', error);
            alert('Failed to modify book');
        }
    };

    return bookData ? <FormBook formTitle="Modify Book" bookData={bookData} onSubmit={handleModifyBook} /> : <p>Loading...</p>;
};

export default ModifyBook;
