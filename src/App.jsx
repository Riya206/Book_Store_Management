import { useState } from "react";

function Bookstore() {
  const [book, setBook] = useState({
    isbn: "",
    title: "",
    author: "",
    price: ""
  });

  const [books, setBooks] = useState([]);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");

  const changeHandler = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const addBook = (e) => {
    e.preventDefault();

    // validation
    if (!book.isbn || !book.title || !book.author || !book.price) {
      setMsg("All fields are required");
      return;
    }

    // check duplicate ISBN
    const exists = books.find(b => b.isbn === book.isbn);
    if (exists) {
      setMsg("Book already exists");
      return;
    }

    setBooks([...books, book]);
    setBook({ isbn: "", title: "", author: "", price: "" });
    setMsg("Book added successfully");
    setShow(false);
  };

  const viewBook = () => {
    setShow(true);
    setMsg("");
  };

  return (
    <>
      <h2>Bookstore Management</h2>

      <input name="isbn" placeholder="ISBN" value={book.isbn} onChange={changeHandler} /><br /><br />
      <input name="title" placeholder="Title" value={book.title} onChange={changeHandler} /><br /><br />
      <input name="author" placeholder="Author" value={book.author} onChange={changeHandler} /><br /><br />
      <input name="price" placeholder="Price" value={book.price} onChange={changeHandler} /><br /><br />

      <button onClick={addBook}>Add Book</button>
      <button onClick={viewBook}>View Book</button>

      {msg && <p style={{ color: "blue" }}>{msg}</p>}

      {show && (
        <>
          <h3>Book Details</h3>
          {books.length === 0 ? (
            <p>No books added yet</p>
          ) : (
            books.map((b, i) => (
              <p key={i}>
                ISBN: {b.isbn} | Title: {b.title} | Author: {b.author} | ₹{b.price}
              </p>
            ))
          )}
        </>
      )}
    </>
  );
}

export default Bookstore;