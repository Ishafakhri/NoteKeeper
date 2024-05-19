/**
 * @copyright ishafakhri 2024
 */

'use strict';

/**
 * import module
 */
import { NavItem } from "./components/NavItem.js";
import { activeNotebook } from "./utils.js";
import {Card} from "./components/Card.js";

const /** {HTMLElement} */ $sidebarList = document.querySelector('[data-sidebar-list]');

const /** {HTMLElement} */ $notePanelTitle = document.querySelector('[data-note-panel-title]');

const /** {HTMLElement} */ $notePanel = document.querySelector('[data-note-panel]');
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
        },

        /**
         * @param {string} notebookId
         * @param {Object} notebookData
         */
        update(notebookId, notebookData) {
            const /** {HTMLElement} */ $oldNotebook = document.querySelector(`[data-notebook="${notebookId}"`);
            const /** {HTMLElement} */ $newNotebook = NavItem(notebookData.id, notebookData.name);

            $notePanelTitle.textContent = notebookData.name;
            $sidebarList.replaceChild($newNotebook, $oldNotebook);
            activeNotebook.call($newNotebook);
        },

        /**
         * 
         * @param {string} notebookId 
         */
        delete(notebookId) {
            const /** {HTMLElement} */ $deletedNotebook = document.querySelector(`[data-notebook="${notebookId}"]`);

            const /** {HTMLElement | null} */ $ActiveNavItem = $deletedNotebook.nextElementSibling ?? $deletedNotebook.previousElementSibling;
            if($ActiveNavItem){
                $ActiveNavItem.click();
            } else {
                $notePanelTitle.innerHTML = '';
                // $notePanel.innerHTML = '';
            }
            
            $deletedNotebook.remove();
        }
    },
    note: {
        /**
         * 
         * @param {Object} noteData 
         */
        create(noteData) {
            //Append card into notePanel
            const /**{HTMLElement} */ $card = Card(noteData);
            $notePanel.appendChild($card);
        }
    }
}