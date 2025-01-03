const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const { mockRequest, mockResponse } = require("jest-mock-req-res");
const sessionManager = require("../../utils/sessionUser");
const Library = require("../../model/library");
const libraryController = require("../../controller/libraryController");

jest.mock("../../model/library");
jest.mock("fs");
jest.mock("../../utils/sessionUser");

const sessionHandler = {
  getUserSession: jest.fn(),
};

sessionManager.mockImplementation(() => sessionHandler);

describe("Library Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

    it("should render edit mode when bookId is provided", async () => {
      const req = mockRequest({ query: { id: "123" } });
      const res = mockResponse();

      await libraryController.addOrEditBook(req, res);

      expect(res.render).toHaveBeenCalledWith("addBook", {
        editMode: true,
        bookId: "123",
        title: "Edit Book",
      });
    });

    it("should render add mode when bookId is not provided", async () => {
      const req = mockRequest({ query: {} });
      const res = mockResponse();

      await libraryController.addOrEditBook(req, res);

      expect(res.render).toHaveBeenCalledWith("addBook", {
        editMode: false,
        bookId: null,
        title: "Add Book",
      });
    });

    it("should handle errors gracefully", async () => {
      const req = mockRequest();
      const res = mockResponse();

      jest.spyOn(res, "render").mockImplementation(() => {
        throw new Error("Error rendering");
      });

      await libraryController.addOrEditBook(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith("Server error");
    });


    it("should add a book successfully", async () => {
      const req = mockRequest({
        body: { title: "Test Book", author: "Test Author" },
        files: {
          pdf: [{ filename: "test.pdf" }],
          image: [{ filename: "test.jpg" }],
        },
      });
      sessionHandler.getUserSession.mockReturnValue({
        user: { _id: "user123" },
      });
      const res = mockResponse();

      await libraryController.addBook(req, res);

      expect(Library.create).toHaveBeenCalledWith({
        title: "Test Book",
        pdf: "test.pdf",
        author: "Test Author",
        image: "test.jpg",
        userId: "user123",
      });
      expect(res.json).toHaveBeenCalledWith({
        status: "ok",
        message: "Book added successfully",
      });
    });

    it("should handle errors while adding a book", async () => {
      const req = mockRequest({
        body: { title: "Test Book", author: "Test Author" },
        files: {
          pdf: [{ filename: "test.pdf" }],
          image: [{ filename: "test.jpg" }],
        },
      });
      sessionHandler.getUserSession.mockReturnValue({
        user: { _id: "user123" },
      });
      const res = mockResponse();

      Library.create.mockImplementation(() => {
        throw new Error("Error adding book");
      });

      await libraryController.addBook(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error while adding book",
      });
    });


    it("should return all books", async () => {
      const req = mockRequest();
      const res = mockResponse();

      Library.find.mockResolvedValue([
        { title: "Book 1" },
        { title: "Book 2" },
      ]);
      sessionHandler.getUserSession.mockReturnValue({
        user: { name: "Test User" },
      });

      await libraryController.getAllBooks(req, res);

      expect(res.json).toHaveBeenCalledWith({
        books: [{ title: "Book 1" }, { title: "Book 2" }],
        userDetails: { user: { name: "Test User" } },
      });
    });

    it("should delete a book and associated files", async () => {
      const req = mockRequest({ params: { bookId: "123" } });
      const res = mockResponse();

      mongoose.Types.ObjectId.isValid.mockReturnValue(true);
      Library.findOneAndDelete.mockResolvedValue({
        pdf: "test.pdf",
        image: "test.jpg",
      });

      fs.unlink.mockImplementation((path, callback) => callback(null));

      await libraryController.deleteUserBook(req, res);

      expect(fs.unlink).toHaveBeenCalledTimes(2);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Book deleted successfully",
      });
    });

    it("should handle invalid book ID", async () => {
      const req = mockRequest({ params: { bookId: "invalid" } });
      const res = mockResponse();

      mongoose.Types.ObjectId.isValid.mockReturnValue(false);

      await libraryController.deleteUserBook(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Invalid ID format");
    });
});
