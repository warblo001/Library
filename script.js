const libraryItems = document.querySelector('.library-items');
const addBookButton = document.querySelector('.add-book');
const newBookForm = document.querySelector('.new-book-form');
const headers = document.querySelectorAll('th');

libraryItems.addEventListener('click', deleteBook);
libraryItems.addEventListener('click', toggleRead);

addBookButton.addEventListener('click', displayBookForm);
newBookForm.addEventListener('submit', addBook);
headers.forEach((header) => header.addEventListener('click', sortDisplay));

class Book {
  constructor(params) {
    this.title = params.title;
    this.author = params.author;
    this.pages = params.pages;
    this.read = params.read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

let library = [];
const storedLibrary = localStorage.getItem('library');
if (storedLibrary) {
  library = JSON.parse(storedLibrary).map((book) => new Book(book));
}

function addBookToLibrary(book) {
  library.push(book);
  localStorage.setItem('library', JSON.stringify(library));
}

function displayBooks(sortParam = null) {
  libraryItems.innerHTML = library
    .sort((a, b) => (a[sortParam] < b[sortParam] ? -1 : 1))
    .map(
      (book, i) => `
      <tr>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>
        <button class='progress' data-index='${i}'>
          ${
            book.read
              ? "<span class='material-icons'>task_alt</span>"
              : "<span class='material-icons'>remove_circle_outline</span>"
          }
        </button>
      </td>
      <td><button class='delete' data-index='${i}'>Delete</button></td>
      </tr>`
    )
    .join('');
}

function sortDisplay(e) {
  param = e.target.textContent.toLowerCase().replace('?', '');
  displayBooks(param);
}

function displayBookForm() {
  addBookButton.classList.add('hidden');
  newBookForm.classList.remove('hidden');
}

function hideBookForm() {
  newBookForm.classList.add('hidden');
  addBookButton.classList.remove('hidden');
}

function addBook(e) {
  e.preventDefault();
  book = new Book({
    title: this.querySelector('[name=title]').value,
    author: this.querySelector('[name=author]').value,
    pages: this.querySelector('[name=pages]').value,
    read: this.querySelector('[name=read]').checked,
  });
  addBookToLibrary(book);
  hideBookForm();
  displayBooks();
  this.reset();
}

function toggleRead(e) {
  if (!e.target.matches('.progress')) return;
  index = e.target.dataset.index;
  library[index].toggleRead();
  localStorage.setItem('library', JSON.stringify(library));
  displayBooks();
}

function deleteBook(e) {
  if (!e.target.matches('.delete')) return;
  library.splice(e.target.dataset.index, 1);
  localStorage.setItem('library', JSON.stringify(library));
  displayBooks();
}

const books = [];
books[1] = new Book({
  title: 'The Far Field',
  author: 'Madhuri Vijay',
  pages: 432,
  read: false,
});
books[2] = new Book({
  title: 'Discourses and Selected Writings',
  author: 'Epictetus',
  pages: 245,
  read: false,
});
books[3] = new Book({
  title: 'Exit West',
  author: 'Mohsin Hamid',
  pages: 231,
  read: true,
});
books[4] = new Book({
  title: "Einstein's Dreams",
  author: 'Alan Lightman',
  pages: 140,
  read: false,
});
books[5] = new Book({
  title: 'One Good Turn',
  author: 'Kate Atkinson',
  pages: 418,
  read: true,
});
books[6] = new Book({
  title: 'The Sense of an Ending',
  author: 'Julian Barnes',
  pages: 163,
  read: true,
});
books[7] = new Book({
  title: 'The Idiot',
  author: 'Fyodor Dostoevsky',
  pages: 615,
  read: true,
});

// seed library list if empty
if (library.length === 0) {
  books.forEach((book) => addBookToLibrary(book));
}

displayBooks();