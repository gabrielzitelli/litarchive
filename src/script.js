import { renderBooks } from './uiManager.js';
import { setUpFormListener, setUpDeleteListener, setUpSortListener, setUpExportImportListeners, setUpControlListener } from './eventManager.js';

document.addEventListener("DOMContentLoaded", () => {
    renderBooks();
    setUpFormListener();
    setUpDeleteListener();
    setUpSortListener();
    setUpControlListener();
    setUpExportImportListeners();
});
