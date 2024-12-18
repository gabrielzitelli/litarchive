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
            published DATE,
            finished DATE,
            series TEXT
        );
    `);

    return db;
}

export function addBook(db, book) {
    const { name, author, genres, published, finished, series } = book;

    db.run(`
        INSERT INTO books (name, author, genres, published, finished, series)
        VALUES (?, ?, ?, ?, ?, ?);
    `, [name, author, genres, published, finished, series]);

    saveDatabase(db);
}

export function getBooks(db, sortField = "id", sortOrder = "ASC") {
    const validFields = ["id", "name", "author", "genres", "published", "finished", "series"];
    if (!validFields.includes(sortField)) sortField = "id";
    if (sortOrder !== "ASC" && sortOrder !== "DESC") sortOrder = "ASC";

    const books = db.exec(`
        SELECT *
        FROM books
        ORDER BY 
            CASE
                WHEN ${sortField} IS NULL OR ${sortField} = "" THEN 1
                ELSE 0
            END,
            ${sortField} ${sortOrder};
    `);
    return books[0] ? books[0].values : [];
}

function saveDatabase(db) {
    const data = db.export();
    localStorage.setItem("bookTrackerDB", JSON.stringify(Array.from(data)));
}

export async function loadDatabase() {
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

export function deleteBook(db, id) {
    db.run("DELETE FROM books WHERE id = ?;", [id]);
    saveDatabase(db);
}

export function clearDatabase(bd = null) {
    if (!bd) {
        localStorage.removeItem("bookTrackerDB");
        return;
    }

    bd.run("DROP TABLE books;");
    bd.run(`
        CREATE TABLE IF NOT EXISTS books (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            author TEXT,
            genres TEXT,
            published DATE,
            finished DATE,
            series TEXT
        );
    `);

    saveDatabase(bd);
}
