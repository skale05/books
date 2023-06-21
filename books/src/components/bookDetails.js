import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        fetch(`/api/books/${id}`)
            .then((response) => response.json())
            .then((data) => setBook(data));
    }, [id]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Book Details</h2>
            <p>ID: {book.id}</p>
            <p>Title: {book.title}</p>
            <p>Author: {book.author}</p>
        </div>
    );
};

export default BookDetails;
