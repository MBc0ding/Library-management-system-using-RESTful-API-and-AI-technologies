import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from '../../components/layouts/navbar/Navbar';
import DetailsSection from "../../components/layouts/details-section/DetailsSection";
import Footer from '../../components/layouts/footer/Footer';
import api from '../../services/api';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await api.get(`/library-api/books/${id}`);
                setBook(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching book details:', error);
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

    return (
        <section>
            <Navbar darkTheme={ true } />

            {loading ? (
                <div>Loading...</div>
            ) : (
                <DetailsSection book={book} />
            )}
            <Footer />
        </section>
    )
}

export default BookDetails;
