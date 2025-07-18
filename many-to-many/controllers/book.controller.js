import * as bookService from '../services/book.service.js';

export async function createBook(req, res) {
    const book = await bookService.createBook(req.body);
    await book.populate({ path: 'categories', select: 'name' });
    res.status(201).json(book);
}

export async function getBooks(req, res) {
    const books = await bookService.getAllBooks();
    res.json(books);
}

export async function getBook(req, res) {
    try {
        const book = await bookService.getBookById(req.params.id);
        await book.populate({ path: 'categories', select: 'name' });
        res.json(book);
    } catch (error) {
        return res.status(404).json({ message: 'Book not found' });
    }

}

export async function getBooksByCategory(req, res) {
    const categoryId = req.params.categoryId;
    const books = await bookService.getBooksByCategory(categoryId);
    if (books.length === 0) {
        return res.status(404).json({ message: 'No books found for this category' });
    }
    res.json(books);
}
