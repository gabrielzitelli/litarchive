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
            series TEXT,
            status TEXT DEFAULT 'wished',
            finished DATE
        );
    `);

    return db;
}

export function addBook(db, book) {
    const { name, author, genres, published, series, status, finished } = book;

    db.run(`
        INSERT INTO books (name, author, genres, published, series, status, finished)
        VALUES (?, ?, ?, ?, ?, ?, ?);
    `, [name, author, genres, published, series, status, finished]);

    saveDatabase(db);
}

export function getBooks(db, sortField = "id", sortOrder = "ASC", filters = {}) {
    const validFields = ["id", "name", "author", "genres", "published", "series", "status", "finished"];
    if (!validFields.includes(sortField)) sortField = "id";
    if (sortOrder !== "ASC" && sortOrder !== "DESC") sortOrder = "ASC";

    let query = `
        SELECT *
        FROM books
        WHERE 1=1
    `;
    const params = [];

    if (filters.name) {
        query += " AND name LIKE ? ";
        params.push(`%${filters.name}%`);
    }
    if (filters.author) {
        query += " AND author LIKE ? ";
        params.push(`%${filters.author}%`);
    }
    if (filters.genres) {
        query += " AND genres LIKE ? ";
        params.push(`%${filters.genres}%`);
    }
    if (filters.published) {
        query += " AND published >= ? ";
        params.push(filters.published);
    }
    if (filters.series) {
        query += " AND series LIKE ? ";
        params.push(`%${filters.series}%`);
    }
    if (filters.status && filters.status !== "") {
        query += " AND status = ? ";
        params.push(filters.status);
    }
    if (filters.finished) {
        query += " AND finished <= ? ";
        params.push(filters.finished);
    }

    query += `
        ORDER BY 
            CASE
                WHEN ${sortField} IS NULL OR ${sortField} = "" THEN 1
                ELSE 0
            END,
            ${sortField} ${sortOrder};
    `;

    const books = db.exec(query, params);
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
            series TEXT,
            status TEXT DEFAULT 'wished',
            finished DATE
        );
    `);

    saveDatabase(bd);
}
