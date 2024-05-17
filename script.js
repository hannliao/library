class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    
    get info() {
        return `${this.title},${this.author},${this.pages} pages,`;
    }
}

class Library {
    constructor() {
        this.books = [];
        this.catalog = document.querySelector(".catalog");
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(book) {
        this.books = this.books.filter(b => b !== book);
    }

    changeReadStatus(book) {
        if (book.read == "read") book.read = "not read yet";
        else book.read = "read";
    }

    clear() {
        this.catalog.innerHTML = "";
    }

    render() {
        this.clear();

        for (let [i, book] of this.books.entries()) {
            const card = document.createElement("div");
            card.setAttribute("index", i);
            card.innerHTML = book.info.replaceAll(",", "<br>");
    
            const readButton = document.createElement("button");
            readButton.textContent = book.read;
            readButton.addEventListener("click", () => {
                this.changeReadStatus(book);
                readButton.textContent = book.read;
            });
            card.append(readButton);
    
            const removeButton = document.createElement("button");
            removeButton.textContent = "remove";
            removeButton.addEventListener("click", () => {
                this.books.splice(card.getAttribute("index"), 1);
                this.render();
            });
            card.append(removeButton);
            this.catalog.append(card);
        }
    }
}

class Modal {
    constructor() {
        this.dialog = document.querySelector("dialog");
        this.addBookButton = document.querySelector("#add, dialog");
        this.closeButton = document.querySelector("dialog #close");
        this.addBookForm = document.querySelector("#addBookForm");
        this.title = document.querySelector("#title");
        this.author = document.querySelector("#author");
        this.pages = document.querySelector("#pages");
        this.readStatus = document.querySelector("#read_status");

        this.addBookButton.addEventListener("click", this.openModal.bind(this));
        this.closeButton.addEventListener("click", this.closeModal.bind(this));
        this.addBookForm.addEventListener("submit", this.addBook.bind(this));
    }

    openModal() {
        this.dialog.showModal();
    }

    closeModal() {
        this.addBookForm.reset();
        this.dialog.close();
    }

    addBook(event) {
        event.preventDefault();
        const newBook = new Book(this.title.value, this.author.value, this.pages.value, 
            (this.readStatus.checked ? "read":"not read yet"));
        library.addBook(newBook);
        library.render();
        this.addBookForm.reset();
        this.dialog.close();
    }
}

const library = new Library();
const modal = new Modal();

// create a few books manually
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet")
const toKillAMockingbird = new Book("To Kill a Mockingbird", "Harper Lee", 384, "read");
const prideAndPrejudice = new Book("Pride and Prejudice", "Jane Austen", 266, "not read yet");
const eastOfEden = new Book("East of Eden", "John Steinbeck", 601, "read");

// add initial books to library
library.addBook(theHobbit);
library.addBook(toKillAMockingbird);
library.addBook(prideAndPrejudice);
library.addBook(eastOfEden);
library.render();