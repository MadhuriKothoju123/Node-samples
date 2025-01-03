const express = require("express");
const {
  addBook,
  getAllBooks,
  getBookById,
  AddBookPage,
  getAllBooksPage,
  downloadPdf,
  deleteUserBook,
  editBookPage,
  addOrEditBook,
  updateBookById,
} = require("../controller/libraryController");
const multer = require("multer");
const { isAuthenticatedMiddleware } = require("../utils/auth");
const router = express.Router();

// router.use(authenticateToken);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });
console.log(upload, "upload");
router.post(
  "/addBook",
  isAuthenticatedMiddleware,
  upload.fields([
    { name: "pdf", maxCount: 1 }, // Accept a single PDF file
    { name: "image", maxCount: 1 }, // Accept a single image file
  ]),
  addBook
);
console.log(upload, "upload");

router.get("/addOrEditBook/:id?", addOrEditBook);
// router.get("/editBook/:id", editBookPage)
router.get("/getAllBooks", isAuthenticatedMiddleware, getAllBooks);
router.get("/getAllBooksPage", getAllBooksPage);
router.get("/getBook/:id", getBookById);
router.get("/download/:filename", downloadPdf);
router.delete("/deleteBook/:bookId", isAuthenticatedMiddleware, deleteUserBook);
router.put("/updateBook/:id", isAuthenticatedMiddleware, updateBookById);
module.exports = router;
