const library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }
}

function addBookToLibrary(book) {
    library.push(book);
}

function libraryCatalog() {
    for (const book of library) {
        console.log(book.info());
    }
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet")
const toKillAMockingbird = new Book("To Kill a Mockingbird", "Harper Lee", 384, "read");
const prideAndPrejudice = new Book("Pride and Prejudice", "Jane Austen", 266, "not read yet");
const eastOfEden = new Book("East of Eden", "John Steinbeck", 601, "read");


const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#add, dialog");
const closeButton = document.querySelector("dialog #close");

showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", () => {
    dialog.close();
});