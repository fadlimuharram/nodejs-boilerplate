import chai from "chai";
import chatHttp from "chai-http";
import "chai/register-should";
import app from "../index";

chai.use(chatHttp);
const { expect } = chai;

describe("Testing the book endpoints:", () => {
  it("should create a book", done => {
    const book = {
      title: "First Book",
      price: "20000",
      description: "This is some description"
    };

    chai
      .request(app)
      .post("/api/v1/books")
      .set("Accept", "application/json")
      .send(book)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.data).to.include({
          id: 1,
          title: book.title,
          price: book.price,
          description: book.description
        });

        done();
      });
  });

  it("Should not create a book with incomplete parameters", done => {
    const book = {
      price: "20000",
      description: "This is some description"
    };

    chai
      .request(app)
      .post("/api/v1/books")
      .set("Accept", "application/json")
      .send(book)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it("It should get all books", done => {
    chai
      .request(app)
      .get("/api/v1/books")
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.data[0].should.have.property("id");
        res.body.data[0].should.have.property("title");
        res.body.data[0].should.have.property("price");
        res.body.data[0].should.have.property("description");
        done();
      });
  });
});
