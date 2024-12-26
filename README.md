# 📚 Book Tracker

A Progeressive Web Application (PWA) to track books you have read, are reading, or want to read.

Access the web app [here](https://gabrielzitelli.github.io/litarchive/).

---

## 🌟 Features
- **Tracking**: Save details of books you have read, are reading, or want to read
- **Offline Support**: thanks to PWA capabilities, the app works offline
- **Responsive Design**: works on all devices (desktop, tablet, mobile)
- **Installable**: Add the app to your home screen and use it as a native app
- **Control**: Delete, filter and sort your books
- **Data Persistence**: Your books are saved in the browser's local storage
- **Import/Export**: Backup your books or import them from a file
- **Dark Mode**: Toggle between light and dark themes

---

## 🛠️ Technologies

- **JavaScript**: Main language
- **HTML, CSS, Bootstrap**: Front-end
- **SQL.js**: In-browser SQLite database for managing and querying the books data
- **PWABuilder**: Tool to generate the PWA manifest and service worker
- **GitHub Pages**: Hosting the app

---

## 📸 Screenshots
Light and dark themes are available. Here are some screenshots:
![Light Theme](/assets/screenshots/screenshot-light-theme.png)

![Dark Theme](/assets/screenshots/screenshot-dark-theme.png)


---

## 🚀 Installation

The app can be installed on your device.

### Desktop
1. Open the app in your browser
2. Click on the install button in the address bar
3. The app will be installed and you can access it from your desktop

### Mobile
1. Open the app in your browser
2. Access the browser's menu and click on "Add to Home Screen"
3. The app will be installed and you can access it from your home screen

---

## 📦 Contributing

Contributions are welcome! If you have ideas for new features, improvements or find any bugs, please open an issue or submit a pull request.

### Steps to contribute

1. Clone this repository
```bash
git clone https://github.com/gabrielzitelli/litarchive.git
```
2. Install dependencies, ensure you have Node.js and npm installed then run:
```bash
npm install
```
3. Use `serve` to run the app locally
```bash
npx serve
```
4. Open your browser an navigate to the URL provided by `serve`

### Notes
- The app uses an in-browser SQLite database to manage the books data. The database is created and queried using SQL.js. No additional setup is requiered.
- File structure:
    - `index.html`: main entry point of the app
    - `script.js`: main JavaScript file
    - `database.js`: manages the SQL database logic
    - `style.css`: main CSS file

---

## 📜 License

This project is licensed under the MIT License.
