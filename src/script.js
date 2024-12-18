import { renderBooks } from './uiManager.js';
import { setUpFormListener, setUpDeleteListener, setUpRefreshListener, setUpExportImportListeners, setUpClearListener } from './eventManager.js';

document.addEventListener("DOMContentLoaded", () => {
    renderBooks();
    setUpFormListener();
    setUpDeleteListener();
    setUpRefreshListener();
    setUpClearListener();
    setUpExportImportListeners();
});
