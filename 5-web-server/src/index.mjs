import express from 'express';
import * as fsPromises from 'fs/promises';

const app = express();
const port = 3000;
app.use(express.json());

app.listen(port, () => {
    console.log(`My server is listening on port: ${port}`);
});

// Helper functions
const getAllBooks = async () => {
    try {
        const data = await fsPromises.readFile('../data.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading file:", err);
        throw err;
    }
};

const getBook = async (id) => {
    try {
        const books = await getAllBooks();
        return books.find(book => book.id === id) || null;
    } catch (err) {
        console.error("Error fetching book:", err);
        throw err;
    }
};

// API Endpoints

// Get all books
app.get("/books", async (req, res) => {
    try {
        const books = await getAllBooks();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch books" });
    }
});

// Get one book by ID
app.get("/books/:id", async (req, res) => {
    try {
        const book = await getBook(req.params.id);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch book" });
    }
});
