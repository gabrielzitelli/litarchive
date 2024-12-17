async function initDatabase() {
    const SQL = await initSqlJs({
        locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
    });

    const db = new SQL.Database();

    db.run(`
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            author TEXT,
            genres TEXT,
            published TEXT,
            finished TEXT,
            series TEXT
        );
    `);

    return db;
}

function addBook(db, book) {
    const { name, author, genres, published, finished, series } = book;

    db.run(`
        INSERT INTO books (name, author, genres, published, finished, series)
        VALUES (?, ?, ?, ?, ?, ?);
    `, [name, author, genres, published, finished, series]);

    saveDatabase(db);
}

function getBooks(db) {
    const books = db.exec("SELECT * FROM books;");
    return books[0] ? books[0].values : [];
}

async function renderBooks(db) {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = "";

    const results = db.exec("SELECT * FROM books");
    if (results.length === 0) {
        bookList.innerHTML = "<p>No books found</p>";
        return;
    }

    bookList.innerHTML = "<p>Books found</p>";
    const rows = results[0].values;
    const table = document.createElement("table");

    const headerRow = `
        <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Genres</th>
            <th>Published</th>
            <th>Finished</th>
            <th>Series</th>
        </tr>
    `;
    table.innerHTML = headerRow;

    rows.forEach(row => {
        const [id, name, author, genres, published, finished, series] = row;
        const rowHTML = `
            <tr>
                <td>${name}</td>
                <td>${author}</td>
                <td>${genres}</td>
                <td>${published || "N/A"}</td>
                <td>${finished || "N/A"}</td>
                <td>${series || "N/A"}</td>
            </tr>
        `;
        table.innerHTML += rowHTML;
    });

    bookList.appendChild(table);
}

function saveDatabase(db) {
    const data = db.export();
    localStorage.setItem("bookTrackerDB", JSON.stringify(Array.from(data)));
}

async function loadDatabase() {
    const savedData = localStorage.getItem("bookTrackerDB");

    if (savedData) {
        const SQL = await initSqlJs({
            locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
        });

        const db = new SQL.Database(new Uint8Array(JSON.parse(savedData)));
        return db;
    } else {
        return initDatabase();
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const db = await loadDatabase();
    renderBooks(db);
});

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

    renderBooks(db);
});

document.getElementById("refresh").addEventListener("click", async () => {
    const db = await loadDatabase();
    renderBooks(db);
});
