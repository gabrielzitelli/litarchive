import { renderBooks } from './uiManager.js';
import { setUpFormListener, setUpDeleteListener, setUpSortListener, setUpExportImportListeners, setUpClearListener } from './eventManager.js';

document.addEventListener("DOMContentLoaded", () => {
    renderBooks();
    setUpFormListener();
    setUpDeleteListener();
    setUpSortListener();
    setUpClearListener();
    setUpExportImportListeners();
});
