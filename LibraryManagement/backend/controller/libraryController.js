// Import dependencies
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const sessionManager = require("../utils/sessionUser");
const Library = require("../model/library");



/**
 * Render add/edit book form.
 */
const addOrEditBook = async (req, res) => {
  const bookId = req.query?.id;

  try {
    if (bookId) {
      return res.render("addBook", { 
        editMode: true, 
        bookId, 
        title: "Edit Book" 
      });
    }

    // Render form in add mode
    res.render("addBook", { 
      editMode: false, 
      bookId: null, 
      title: "Add Book" 
    });
  } catch (error) {
    console.error("Error rendering add/edit book page:", error);
    res.status(500).send("Server error");
  }
};

/**
 * Add a new book.
 */
const addBook = async (req, res) => {
  const sessionHandler = sessionManager();
  const { title, author } = req.body;
  const pdfFile = req.files.pdf[0];
  const imageFile = req.files.image[0];
  const { user } = sessionHandler.getUserSession(req);

  try {
    await Library.create({
      title,
      pdf: pdfFile.filename,
      author,
      image: imageFile.filename,
      userId: user._id,
    });

    req.flash("success", "Book added successfully");
    res.json({ status: "ok", message: "Book added successfully" });
  } catch (error) {
    console.error("Error adding book:", error);
    req.flash("error", "Error while adding book");
    res.status(500).json({ message: "Error while adding book" });
  }
};

/**
 * Retrieve all books.
 */
const getAllBooks = async (req, res) => {
  const sessionHandler = sessionManager();
  try {
    const books = await Library.find();
    const userDetails = sessionHandler.getUserSession(req);

    res.json({ books, userDetails });
  } catch (error) {
    console.error("Error retrieving books:", error);
    res.status(500).send("Error retrieving books");
  }
};

/**
 * Retrieve a book by ID.
 */
const getBookById = async (req, res) => {
  const sessionHandler = sessionManager();
  const { id } = req.params;
  const { loggedIn } = sessionHandler.getUserSession(req);

  if (!loggedIn) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const book = await Library.findById(id);

    if (!book) {
      return res.status(404).send("Book not found");
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("Error retrieving book:", error);
    res.status(500).send("Error retrieving book");
  }
};

/**
 * Update a book by ID.
 */
const updateBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedBook = await Library.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).send("Book not found");
    }

    req.flash("success", "Book updated successfully");
    res.status(200).send("Book updated successfully");
  } catch (error) {
    console.error("Error updating book:", error);
    req.flash("error", "Error updating book");
    res.status(500).send("Error updating book");
  }
};

/**
 * Delete a book by ID.
 */
const deleteUserBook = async (req, res) => {
  const { bookId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    req.flash("error", "Invalid ID format");
    return res.status(400).send("Invalid ID format");
  }

  try {
    const book = await Library.findOneAndDelete({ _id: bookId });

    if (!book) {
      req.flash("error", "Book not found");
      return res.status(404).send("Book not found");
    }

    // Delete associated files
    const pdfFilePath = path.join(__dirname, "../files", book.pdf);
    const imageFilePath = path.join(__dirname, "../files", book.image);

    fs.unlink(pdfFilePath, (err) => {
      if (err) console.error("Error deleting PDF file:", err);
    });

    fs.unlink(imageFilePath, (err) => {
      if (err) console.error("Error deleting image file:", err);
    });

    req.flash("success", "Book deleted successfully");
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    req.flash("error", "Internal server error");
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Render all books page.
 */
const getAllBooksPage = (req, res) => {
  try {
    res.render("booksPage");
  } catch (error) {
    console.error("Error rendering books page:", error);
  }
};

/**
 * Download a PDF file.
 */
const downloadPdf = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "files", filename);

  res.download(filePath, filename, (err) => {
    if (err) {
      console.error("Error downloading file:", err);
      res.status(404).send("File not found");
    }
  });
};

// Export modules
module.exports = {
  addOrEditBook,
  addBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteUserBook,
  getAllBooksPage,
  downloadPdf,
};
