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


// get authors and books
app.get("/authorsbooks", (req, res) => {
  const booksWithAuthors = books.map(book => {
    const author = authors.find(author => author.id === book.authorId);
    return {
      ...book,
      author: {
        name: author.name,
        bio: author.bio
      }
    };
  });
  
  res.json(booksWithAuthors);
});

// get a authors and books
app.get("/authorsbooks/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(book => book.id === bookId);
  
  if (book) {
    const author = authors.find(author => author.id === book.authorId);
    const bookWithAuthor = {
      ...book,
      name: author.name,
      bio: author.bio
    };

    res.status(200).json(bookWithAuthor);
  } else {
    res.status(400).json({ error: "Book with the provided ID is not available" });
  }
});



// get review and books
app.get("/reviewsbooks", (req, res) => {
  const booksWithReview = reviews.map(review => {
    const book = books.find(book => book.id === review.bookId);
    return {
      ...review,
      book: {
        title: book.title,
        description: book.description
      }
    };
  });
  
  res.json(booksWithReview);
});

// get a review and books
app.get("/reviewsbooks/:id", (req, res) => {
  const reviewId = parseInt(req.params.id);
  const review = reviews.find(review => review.id === reviewId);

  if (review) {
    const book = books.find(book => book.id === review.bookId);
    const bookWithReview = {
      ...review,
        title: book.title,
    };
    res.status(200).json(bookWithReview);
  } else {
    res.status(400).json({ error: "Book with the provided ID is not available" });
  }
});


// get all books
app.get("/books", (req, res) => {
  res.json(books);
});

// get a specific books
app.get("/books/:id", (req, res) => {
  // books/1
  const book = books.find((b) => parseInt(b.id) === parseInt(req.params.id));
  // make sure book is available
  if (book) {
    res.status(200).json(book);
  } else {
    // error handling
    res.status(400).json({ error: "ID provided is not available" });
  }
});

// get all reviews
app.get("/reviews", (req, res) => {
  res.json(reviews);
});

// get a specific review
app.get("/reviews/:id", (req, res) => {
  // reviews/1
  const review = reviews.find(
    (r) => parseInt(r.id) === parseInt(req.params.id)
  );
  // make sure review is available
  if (review) {
    res.status(200).json(review);
  } else {
    // error handling
    res.status(400).json({ error: "ID provided is not available" });
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
  res.send('<div><a href="/books">Books</a></div><div><a href="/reviews">Reviews</a></div><div><a href="/authors">Authors</a></div><div><a href="/authorsbooks">Authors and Books</a></div><div><a href="/reviewsbooks">Reviews and Books</a></div>');
});

// start the server
app.listen(1204, () => {
  console.log("Bookstore app is running on port http://localhost:1204");
});
