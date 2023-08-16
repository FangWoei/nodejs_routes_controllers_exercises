const express = require("express");

// create an instance of express
const app = express();

let books = [
  {
    id: 1,
    title: "Book One",
    description: "Description of book one",
    authorId: 1,
  },
  {
    id: 2,
    title: "Book Two",
    description: "Description of book two",
    authorId: 2,
  },
];

let reviews = [
  { id: 1, text: "Amazing book!", bookId: 1 },
  { id: 2, text: "Decent read.", bookId: 2 },
];

let authors = [
  { id: 1, name: "Author One", bio: "Bio of Author One" },
  { id: 2, name: "Author Two", bio: "Bio of Author Two" },
];



// get all books
app.get("/books", (req, res) => {
  res.json(books);
});
app.get("/books/:id", (req, res) => {
  const book = books.find((b) => parseInt(b.id) === parseInt(req.params.id));
  if (book) {
    const author = authors.find((author) => author.id === book.authorId);
    res.status(200).json({ ...book, name: author.name, bio: author.bio });
  } else {
    res.status(400).json({ error: "ID unavailable" });
  }
});

// get all reviews
app.get("/reviews", (req, res) => {
  res.json(reviews);
});
app.get("/reviews/:id", (req, res) => {
  const review = reviews.find(
    (r) => parseInt(r.id) === parseInt(req.params.id)
  );
  if (review) {
    const book = books.find((b) => b.id === review.bookId);
    res.status(200).json({ ...review, book_title: book.title });
  } else {
    res.status(400).json({ error: "ID unavailable" });
  }
});

// get all authors
app.get("/authors", (req, res) => {
  res.json(authors);
});

// get a specific author
app.get("/authors/:id", (req, res) => {
  // authors/1
  const author = authors.find(
    (a) => parseInt(a.id) === parseInt(req.params.id)
  );
  // make sure author is available
  if (author) {
    res.status(200).json(author);
  } else {
    // error handling
    res.status(400).json({ error: "ID provided is not available" });
  }
});

app.get("/", (req, res) => {
  res.send('<div><a href="/books">Books</a></div><div><a href="/reviews">Reviews</a></div><div><a href="/authors">Authors</a></div>');
});

// start the server
app.listen(1204, () => {
  console.log("Bookstore app is running on port http://localhost:1204");
});
