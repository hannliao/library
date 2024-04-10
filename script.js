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
        return `${this.title},${this.author},${this.pages} pages,`;
    }
}

function addBookToLibrary(book) {
    library.push(book);
}

function libraryCatalog() {
    for (let [i, book] of library.entries()) {
        const card = document.createElement("div");
        card.setAttribute("index", i);
        card.innerHTML = book.info().replaceAll(",", "<br>");

        const readButton = document.createElement("button");
        readButton.textContent = book.read;
        readButton.addEventListener("click", () => {
            changeReadStatus(book);
            readButton.textContent = book.read;
        });
        card.append(readButton);

        const removeButton = document.createElement("button");
        removeButton.textContent = "remove";
        removeButton.addEventListener("click", () => {
            library.splice(card.getAttribute("index"), 1);
            clearCatalog();
            libraryCatalog();
        });
        card.append(removeButton);
        catalog.append(card);
    }
}

function clearCatalog() {
    catalog.innerHTML = "";
}

function changeReadStatus(book) {
    if (book.read == "read") book.read = "not read yet";
    else book.read = "read";
}

// add initial books to library
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
    clearCatalog();
    libraryCatalog();
    addBookForm.reset();
    dialog.close();
})