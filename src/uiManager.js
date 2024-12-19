import { loadDatabase, getBooks } from "./database.js";

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
}
