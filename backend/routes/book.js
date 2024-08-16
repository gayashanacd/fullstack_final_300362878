import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    bookTitle: { type: String, required: true },
    bookAuthor: { type: String, required: true },
    description: { type: String, required: true }
});

const Book = mongoose.model("300362878-indika", bookSchema);

// get all books
router.route("/book")
    .get((req, res) => {
        Book.find()
            .then((items) => res.json(items))
            .catch((err) => res.status(400).json("Error: " + err));
    });

// get book by id
router.route("/book/:id")
    .get((req, res) => {
        Book.findById(req.params.id)
            .then((item) => res.json(item))
            .catch((err) => res.status(400).json("Error: " + err));
    });

// add a new book
router.route("/book")
    .post((req, res) => {
        const bookTitle = req.body.bookTitle;
        const bookAuthor = req.body.bookAuthor;
        const description = req.body.description;

        // create a new book object 
        const newBook = new Book({
            bookTitle,
            bookAuthor,
            description
        });

        // save the new object (newBook)
        newBook
            .save()
            .then(() => res.json("Book added!"))
            .catch((err) => res.status(400).json("Error: " + err));
    });

// update a book
router.route("/book/:id")
    .put((req, res) => {
        Book.findById(req.params.id)
            .then((item) => {
                item.title = req.body.title;
                item.author = req.body.author;
                item.description = req.body.description;

                item
                    .save()
                    .then(() => res.json("Book updated!"))
                    .catch((err) => res.status(400).json("Error: " + err));
            })
            .catch((err) => res.status(400).json("Error: " + err));
    });

// delete a book by id
router.route("/book/:id")
    .delete((req, res) => {
        Book.findByIdAndDelete(req.params.id)
            .then(() => res.json("Book deleted."))
            .catch((err) => res.status(400).json("Error: " + err));
    });

export default router;