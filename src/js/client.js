/**
 * @copyright ishafakhri 2024
 */

'use strict';

/**
 * import module
 */
import { NavItem } from "./components/NavItem.js";
import { activeNotebook } from "./utils.js";

const /** {HTMLElement} */ $sidebarList = document.querySelector('[data-sidebar-list]');

const /** {HTMLElement} */ $notePanelTitle = document.querySelector('[data-note-panel-title]');
/**
 * @namespace
 * @property {Object} notebook
 * @property {Object} note
 */

export const client = {
    notebook : {
        /**
         * @param {Object} notebookData
         * 
         */
        create(notebookData){
            const /**{HTMLElement} */ $navItem = NavItem(notebookData.id, notebookData.name);
            $sidebarList.appendChild($navItem);
            activeNotebook.call($navItem);
            $notePanelTitle.textContent = notebookData.name;
        },

        read(notebookList){
            notebookList.forEach((notebook, index) => {
                const /** {HTMLElement} */ $navItem = NavItem(notebook.id, notebook.name);
                
                if(index === 0){
                    activeNotebook.call($navItem);
                    $notePanelTitle.textContent = notebook.name;
                }
                $sidebarList.appendChild($navItem);
            });
        }
}
}