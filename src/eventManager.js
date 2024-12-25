import { loadDatabase, addBook, deleteBook, clearDatabase } from "./database.js";
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
        if (!event.target.classList.contains("delete-btn")) {
            return;
        }

        if (!confirm("Are you sure you want to delete this book?")) {
            return;
        }

        const bookEntry = event.target.closest(".book-entry");
        const id = parseInt(bookEntry.getAttribute("data-id"), 10);
        const db = await loadDatabase();
        deleteBook(db, id);
        alert("Book deleted!");
        renderBooks();
    });
}

// Event listener for sorting the books
export function setUpSortListener() {
    document.getElementById("sort-field").addEventListener("change", renderBooks);
    document.getElementById("sort-order").addEventListener("change", renderBooks);
}

// Event listener for refreshing and clearing the database and filters
export function setUpControlListener() {
    document.getElementById("refresh").addEventListener("click", renderBooks);
    document.getElementById("clear").addEventListener("click", async () => {
        if (confirm("Are you sure you want to clear the database?")) {
            clearDatabase();
            renderBooks();
        }
    });

    document.getElementById("clear-filters").addEventListener("click", () => {
        document.getElementById("filter-form").reset();
        renderBooks();
    });
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

// Event listener for toggle light/dark mode
export function setUpThemeListener() {
    const body = document.body;
    const theme = document.getElementById("theme-toggle");

    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        theme.textContent = "☀️";
        theme.classList.remove("btn-dark");
        theme.classList.add("btn-light");
    }

    theme.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            theme.textContent = "☀️";
            theme.classList.remove("btn-dark");
            theme.classList.add("btn-light");
        } else {
            localStorage.setItem("theme", "light");
            theme.textContent = "🌙";
            theme.classList.remove("btn-light");
            theme.classList.add("btn-dark");
        }
    });
}
