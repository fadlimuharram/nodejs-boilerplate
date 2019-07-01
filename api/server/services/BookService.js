import database from "../src/models";

class BookService {
  static async getAllBooks() {
    try {
      return await database.Book.findAll();
    } catch (err) {
      throw err;
    }
  }

  static async addBook(newBook) {
    try {
      return database.Book.create(newBook);
    } catch (err) {
      throw err;
    }
  }
}

export default BookService;
