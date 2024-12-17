import * as Database from './database.js';

export async function renderBooks() {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";

    const db = await Database.loadDatabase();
    const books = Database.getBooks(db);
    if (books.length === 0) {
        bookList.innerHTML = "<p>No books found</p>";
        return;
    }

    const table = document.createElement("table");
    const headerRow = `
        <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Genres</th>
            <th>Published</th>
            <th>Finished</th>
            <th>Series</th>
            <th>Actions</th>
        </tr>
    `;
    table.innerHTML = headerRow;

    books.forEach(row => {
        const [id, name, author, genres, published, finished, series] = row;

        const rowElement = document.createElement("tr");
        rowElement.innerHTML = `
            <tr>
                <td>${name}</td>
                <td>${author}</td>
                <td>${genres}</td>
                <td>${published || "N/A"}</td>
                <td>${finished || "N/A"}</td>
                <td>${series || "N/A"}</td>
                <td>
                    <button class="delete-btn" data-id="${id}">Delete</button>
                </td>
            </tr>
        `;
        table.appendChild(rowElement);
    });

    bookList.appendChild(table);

    // Add event listener to each delete button
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", async (event) => {
            const id = event.target.dataset.id;
            const db = await Database.loadDatabase();
            Database.deleteBook(db, id);
            alert("Book deleted!");
            renderBooks();
        });
    });
}

// Event listener for rendering books on page load
document.addEventListener("DOMContentLoaded", renderBooks);

// Event listener for adding a book
document.getElementById("book-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const db = await Database.loadDatabase();

    const book = {
        name: document.getElementById("name").value,
        author: document.getElementById("author").value,
        genres: document.getElementById("genres").value,
        published: document.getElementById("published").value,
        finished: document.getElementById("finished").value,
        series: document.getElementById("series").value
    };

    Database.addBook(db, book);
    alert("Book added!");

    renderBooks();
});

// Event listener for refreshing the book list
document.getElementById("refresh").addEventListener("click", renderBooks);
