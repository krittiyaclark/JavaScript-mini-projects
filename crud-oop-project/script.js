// Book Class: Represent a Book
class Book {
	constructor(title, author, isbn) {
		this.title = title
		this.author = author
		this.isbn = isbn
	}
}

// UI Class: Handles UI Tasks
class UI {
	static displayBooks() {
		const books = Store.getBooks()

		// Loop the StoreBooks and call the addBookToList method and pass that (book) into it
		books.forEach((book) => UI.addBookToList(book))
	}

	static addBookToList(book) {
		const list = document.querySelector('#book-list')
		// Create the row
		const row = document.createElement('tr')
		// Add column
		row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `

		list.appendChild(row)
	}

	static deleteBook(el) {
		if (el.classList.contains('delete')) {
			el.parentElement.parentElement.remove()
		}
	}

	static showAlert(messsage, className) {
		const div = document.createElement('div')
		div.className = `alert alert-${className}`
		div.appendChild(document.createTextNode(messsage))
		const container = document.querySelector('.container')
		const form = document.querySelector('#book-form')
		container.insertBefore(div, form)

		// Vanish in 5 seconds
		setTimeout(() => document.querySelector('.alert').remove(), 5000)
	}

	static clearFields() {
		document.querySelector('#title').value = ''
		document.querySelector('#author ').value = ''
		document.querySelector('#isbn').value = ''
	}
}

// Store Class: Handles Storage
class Store {
	static getBooks() {
		let books
		if (localStorage.getItem('book') === null) {
			books = []
		} else {
			book = JSON.parse(localStorage.getItem('books'))
		}
		return books
	}

	static addBooks(book) {
		const books = Store.getBooks()

		books.push(book)

		localStorage.setItem('books', JSON.stringify(books))
	}

	static removeBooks(isbn) {
		const books = Store.getBooks()

		books.forEach((book, index) => {
			if (book.isbn === isbn) {
				books.splice(index, 1)
			}
		})

		localStorage.setItem('books', JSON.stringify(books))
	}
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
	// Prevent actual submit
	e.preventDefault()
	// Get form value
	const title = document.querySelector('#title').value
	const author = document.querySelector('#author ').value
	const isbn = document.querySelector('#isbn').value

	// Validate
	if (title === '' || author === '' || isbn === '') {
		UI.showAlert('Please fill in all fields', 'danger')
	} else {
		// Instatiate book
		const book = new Book(title, author, isbn)

		// Add Book to UI
		UI.addBookToList(book)

		// Add Book to Store
		Store.addBooks(book)

		// Show success messagae
		UI.showAlert('Book Added', 'success')

		// Clear fields
		UI.clearFields()
	}
})

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
	UI.deleteBook(e.target)
})
