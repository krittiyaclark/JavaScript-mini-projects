"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Book Class: Represent a Book
var Book = function Book(author, title, isbn) {
  _classCallCheck(this, Book);

  this.author = author;
  this.title = title;
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
  }]);

  return UI;
}(); // Store Class: Handles Storage
// Event: Display Books


document.addEventListener('DOMContentLoaded', UI.displayBooks); // Event: Remove a Book