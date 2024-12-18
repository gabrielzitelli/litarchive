import { renderBooks } from './uiManager.js';
import { setUpFormListener, setUpDeleteListener, setUpRefreshListener, setUpExportImportListeners } from './eventManager.js';

document.addEventListener("DOMContentLoaded", () => {
    renderBooks();
    setUpFormListener();
    setUpDeleteListener();
    setUpRefreshListener();
    setUpExportImportListeners();
});
