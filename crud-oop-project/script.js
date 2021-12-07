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
		const StoreBooks = [
			{
				title: 'Book One',
				author: 'John Doe',
				isbn: '12345',
			},
			{
				title: 'Book Two',
				author: 'Steven Grinder',
				isbn: '56789',
			},
		]

		const books = StoreBooks

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
	}

	static clearFields() {
		document.querySelector('#title').value = ''
		document.querySelector('#author ').value = ''
		document.querySelector('#isbn').value = ''
	}
}

// Store Class: Handles Storage

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

		// Clear fields
		UI.clearFields()
	}
})

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
	UI.deleteBook(e.target)
})
