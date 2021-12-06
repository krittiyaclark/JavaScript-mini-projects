"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Book Class: Represent a Book
var Book = function Book(title, author, isbn) {
  _classCallCheck(this, Book);

  this.title = title;
  this.author = author;
  this.isbn = isbn;
}; // UI Class: Handles UI Tasks


var UI =
/*#__PURE__*/
function () {
  function UI() {
    _classCallCheck(this, UI);
  }

  _createClass(UI, null, [{
    key: "displayBooks",
    value: function displayBooks() {
      var StoreBooks = [{
        title: 'Book One',
        author: 'John Doe',
        isbn: '12345'
      }, {
        title: 'Book Two',
        author: 'Steven Grinder',
        isbn: '56789'
      }];
      var books = StoreBooks; // Loop the StoreBooks and call the addBookToList method and pass that (book) into it

      books.forEach(function (book) {
        return UI.addBookToList(book);
      });
    }
  }, {
    key: "addBookToList",
    value: function addBookToList(book) {
      var list = document.querySelector('#book-list'); // Create the row

      var row = document.createElement('tr'); // Add column

      row.innerHTML = "\n        <td>".concat(book.title, "</td>\n        <td>").concat(book.author, "</td>\n        <td>").concat(book.isbn, "</td>\n        <td><a href=\"#\" class=\"btn btn-danger btn-sm delete\">X</a></td>\n        ");
      list.appendChild(row);
    }
  }, {
    key: "deleteBook",
    value: function deleteBook(el) {
      if (el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  }, {
    key: "clearFields",
    value: function clearFields() {
      document.querySelector('#title').value = '';
      document.querySelector('#author ').value = '';
      document.querySelector('#isbn').value = '';
    }
  }]);

  return UI;
}(); // Store Class: Handles Storage
// Event: Display Books


document.addEventListener('DOMContentLoaded', UI.displayBooks); // Event: Add a Book

document.querySelector('#book-form').addEventListener('submit', function (e) {
  // Prevent actual submit
  e.preventDefault(); // Get form value

  var title = document.querySelector('#title').value;
  var author = document.querySelector('#author ').value;
  var isbn = document.querySelector('#isbn').value; // Instatiate book

  var book = new Book(title, author, isbn); // Add Book to UI

  UI.addBookToList(book); // Clear fields

  UI.clearFields();
}); // Event: Remove a Book

document.querySelector('#book-list').addEventListener('click', function (e) {
  UI.deleteBook(e.target);
});