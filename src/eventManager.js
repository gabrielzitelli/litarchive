import { loadDatabase, addBook, deleteBook } from "./database.js";
import { renderBooks } from "./uiManager.js";
import { exportData, importData, JSONExporter, CSVExporter } from "./exportManager.js";

// Event listener for adding a book
export function setUpFormListener() {
    document.getElementById("book-form").addEventListener("submit", async (event) => {
        event.preventDefault();

        const db = await loadDatabase();
        const book = {
            name: document.getElementById("name").value,
            author: document.getElementById("author").value,
            genres: document.getElementById("genres").value,
            published: document.getElementById("published").value,
            finished: document.getElementById("finished").value,
            series: document.getElementById("series").value
        };

        addBook(db, book);
        alert("Book added!");
        renderBooks();
    });
}

// Event listener for deleting a book
export function setUpDeleteListener() {
    document.getElementById("book-list").addEventListener("click", async (event) => {
        if (event.target.classList.contains("delete-btn")) {
            const id = event.target.getAttribute("data-id");
            const db = await loadDatabase();
            deleteBook(db, id);
            alert("Book deleted!");
            renderBooks();
        }
    });
}

// Event listener for refreshing the book list
export function setUpRefreshListener() {
    document.getElementById("refresh").addEventListener("click", renderBooks);
}

// Event listeners for exporting and importing data
export function setUpExportImportListeners() {
    document.getElementById("export-json").addEventListener("click", () => exportData(new JSONExporter()));
    document.getElementById("export-csv").addEventListener("click", () => exportData(new CSVExporter()));
    document.getElementById("file-input").addEventListener("change", async (event) => {
        const file = event.target.files[0];
        if (!file) {
            alert("No file selected");
            return;
        }

        importData(file);
        renderBooks();
    });
}
