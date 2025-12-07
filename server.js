const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const fs = require('fs');

let books = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Display home page with book list
app.get("/", (req, res) => {
    res.render("home", { data: books });
});

// Add a book (POST request)
app.post("/add", (req, res) => {
    const newBook = {
        bookName: req.body.bookName,
        bookAuthor: req.body.bookAuthor,
        bookPages: req.body.bookPages,
        bookPrice: req.body.bookPrice,
        bookState: "Available"
    };

    books.push(newBook);
    res.render("home", { data: books });
});

// Issue a book
app.post("/issue", (req, res) => {
    const requestedBookName = req.body.bookName;

    books.forEach(book => {
        if (book.bookName === requestedBookName) {
            book.bookState = "Issued";
        }
    });

    res.render("home", { data: books });
});

// Return Book Route
app.post("/return", (req, res) => {
    const requestedBookName = req.body.bookName;
    books.forEach(book => {
        if (book.bookName === requestedBookName) {
            book.bookState = "Available";
        }
    });
    res.render("home", { data: books });
});

// Delete a book
app.post("/delete", (req, res) => {
    const requestedBookName = req.body.bookName;
    books = books.filter(book => book.bookName !== requestedBookName);
    res.render("home", { data: books });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

