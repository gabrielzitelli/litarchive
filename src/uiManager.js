import { loadDatabase, getBooks, deleteBook } from "./database.js";

export async function renderBooks() {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";

    const sortField = document.getElementById("sort-field").value;
    const sortOrder = document.getElementById("sort-order").value;

    const filters = {
        name: document.getElementById("name-filter").value.trim(),
        author: document.getElementById("author-filter").value.trim(),
        genres: document.getElementById("genres-filter").value.trim(),
        published: document.getElementById("published-filter").value,
        finished: document.getElementById("finished-filter").value,
        series: document.getElementById("series-filter").value.trim()
    };

    const db = await loadDatabase();
    const books = getBooks(db, sortField, sortOrder, filters);
    if (books.length === 0) {
        bookList.innerHTML = "<p>No books found</p>";
        return;
    }

    const template = document.getElementById("book-template");

    books.forEach((book) => {
        const clone = template.content.cloneNode(true);
        const [id, name, author, genres, published, finished, series] = book;

        clone.querySelector(".title").textContent = name;
        clone.querySelector(".author").textContent = author;
        clone.querySelector(".genres").textContent = genres;
        if (published) clone.querySelector(".published").textContent = published;
        if (finished) clone.querySelector(".finished").textContent = finished;
        if (series) clone.querySelector(".series").textContent = series;

        /* const deleteButton = clone.querySelector(".delete-btn");
        deleteButton.addEventListener("click", async () => {
            deleteBook(db, id);
            renderBooks();
        }); */

        bookList.appendChild(clone);
    });
}
