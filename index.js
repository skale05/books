

require('dotenv').config();
const cors = require('cors');
const db = require('./db');
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
    res.send('Welcome to my Books Page');
});

app.get('/api/books', async (req, res) => {
    try {
        const query = 'SELECT id, title, author, description, category, publishedAt, cover_url FROM books';
        const { rows } = await db.query(query);

        const formattedBooks = rows.map((book) => ({
            id: book.id,
            title: book.title,
            author: book.author,
            imageUrl: book.cover_url,
            description: book.description,
            category: book.category,
            publishedAt: book.publishedAt,
        }));

        res.json(formattedBooks);
    } catch (error) {
        console.error('Error retrieving books:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/books/:id', async (req, res) => {
    const bookId = req.params.id;

    try {
        const query = 'SELECT id, title, author, description, category, publishedAt, cover_url FROM books WHERE id = $1';
        const { rows } = await db.query(query, [bookId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }

        const book = {
            id: rows[0].id,
            title: rows[0].title,
            author: rows[0].author,
            description: rows[0].description,
            category: rows[0].category,
            publishedAt: rows[0].publishedAt,
            imageUrl: rows[0].cover_url,
        };

        res.json(book);
    } catch (error) {
        console.error('Error retrieving book:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
