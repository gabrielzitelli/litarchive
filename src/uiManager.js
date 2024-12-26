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
        series: document.getElementById("series-filter").value.trim(),
        status: document.getElementById("status-filter").value,
        finished: document.getElementById("finished-filter").value
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
        const [id, name, author, genres, published, series, status, finished] = book;

        clone.querySelector(".book-entry").setAttribute("data-id", id);
        clone.querySelector(".title").textContent = name;
        clone.querySelector(".author").textContent = author;
        clone.querySelector(".genres").textContent = genres;
        if (published) clone.querySelector(".published").textContent = published;
        if (series) clone.querySelector(".series").textContent = series;

        let imageSrc = "";
        let imageText = "";
        switch (status) {
            case "wished":
                imageSrc = "assets/icons/yellow-circle.png";
                imageText = "Wished";
                break;
            case "finished":
                imageSrc = "assets/icons/green-circle.png";
                imageText = (finished) ? finished : "";
                break;            
            default:
                imageSrc = "assets/icons/red-circle.png";
                imageText = "Reading";
                break;
        }
        clone.querySelector(".status-image").src = imageSrc;
        clone.querySelector(".status-text").textContent = imageText;

        bookList.appendChild(clone);
    });
}
