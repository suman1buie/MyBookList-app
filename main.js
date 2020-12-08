// Book class
class Book {
  constructor(name, author, bookId) {
    this.name = name;
    this.author = author;
    this.bookId = bookId;
  }
}

//UI class

class UI {
  static displayBooks() {
    // const StoredBooks = [
    //   {
    //     name: "Book One",
    //     author: "suman mandal",
    //     bookId: "123",
    //   },
    //   {
    //     name: "Book Two",
    //     author: "Bappa mandal",
    //     bookId: "456",
    //   },
    // ];
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.getElementById("book-list");

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.name}</td>
      <td>${book.author}</td>
      <td>${book.bookId}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>
      `;
    list.appendChild(row);
  }

  static clearFields() {
    document.querySelector("#Name").value = "";
    document.querySelector("#Author").value = "";
    document.querySelector("#BookId").value = "";
  }

  static delettItem(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static alertMethod(message, className) {
    let newDiv = document.createElement("div");
    newDiv.className = `text-center alert alert-${className}`;
    newDiv.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.getElementById("book-form");
    container.insertBefore(newDiv, form);
    //remove alert after few second
    setTimeout(() => document.querySelector(".alert").remove(), 2000);
  }
}
//store class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static addBook(book) {
    let books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(BookId) {
    const books = Store.getBooks();
    let newList;
    books.forEach((book, index) => {
      if (book.bookId === BookId) {
        books.splice(index, 1);
      } else {
        newList += book;
      }
    });
    console.log(newList);
    localStorage.setItem("books", JSON.stringify(books));
  }
}

//Events: display books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//Events:add books
document.getElementById("book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#Name").value;
  const author = document.querySelector("#Author").value;
  const bookId = document.querySelector("#BookId").value;

  if (name === "" || author === "" || bookId === "") {
    UI.alertMethod("need everything to done!!", "danger");
  } else {
    const bookk = new Book(name, author, bookId);
    UI.addBookToList(bookk);
    Store.addBook(bookk);
    UI.clearFields();
    UI.alertMethod("new Book details insert!!", "success");
  }
});

// Events:Remove a books
document.getElementById("book-list").addEventListener("click", (event) => {
  //remove book  from UI
  UI.delettItem(event.target);
  //remove book from store
  Store.removeBook(event.target.parentElement.previousElementSibling.innerText);
  // console.log(event.target.parentElement.previousElementSibling.innerText);
  UI.alertMethod("One BookList remove from List!!", "success");
});
