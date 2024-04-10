const library = [];
const dialog = document.querySelector("dialog");
const addBookForm = document.querySelector("#addBookForm");
const addBookButton = document.querySelector("#add, dialog");
const closeButton = document.querySelector("dialog #close");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const readStatus = document.querySelector("#read_status");
const catalog = document.querySelector(".catalog");

// create a few books manually
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet")
const toKillAMockingbird = new Book("To Kill a Mockingbird", "Harper Lee", 384, "read");
const prideAndPrejudice = new Book("Pride and Prejudice", "Jane Austen", 266, "not read yet");
const eastOfEden = new Book("East of Eden", "John Steinbeck", 601, "read");


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title},${this.author},${this.pages} pages,${this.read}`;
    }
}

function addBookToLibrary(book) {
    library.push(book);
}

function libraryCatalog() {
    for (const book of library) {
        const card = document.createElement("div");
        card.innerHTML = book.info().replaceAll(",", "<br>");
        catalog.append(card);
    }
}

addBookToLibrary(theHobbit);
addBookToLibrary(toKillAMockingbird);
addBookToLibrary(prideAndPrejudice);
addBookToLibrary(eastOfEden);
libraryCatalog();

// open and close the modal
addBookButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    addBookForm.reset()
    dialog.close();
});

// create a new book with form values
addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newBook = new Book(title.value, author.value, pages.value, 
        (readStatus.checked ? "read":"not read yet"));
    addBookToLibrary(newBook);
    libraryCatalog(); // this reprints every book
    // maybe re-purpose libraryCatalog() to print one card when a new book is added
    addBookForm.reset();
    dialog.close();
})