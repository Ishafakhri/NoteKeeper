/**
 * @copyright ishafakhri 2024
 */

'use strict';

/**
 * import module
 */
import { NavItem } from "./components/NavItem.js";
import { activeNotebook } from "./utils.js";
import { Card } from "./components/Card.js";

const /** {HTMLElement} */ $sidebarList = document.querySelector('[data-sidebar-list]');

const /** {HTMLElement} */ $notePanelTitle = document.querySelector('[data-note-panel-title]');

const /** {HTMLElement} */ $notePanel = document.querySelector('[data-note-panel]');

const /**{Array<HTMLElement>} */ $noteCreateBtn = document.querySelectorAll('[data-note-create-btn]');

const /** {string} */ emptyNoteTemplate = `
    <div class="empty-notes">
      <span class="material-symbols-rounded" aria-hidden="true">note_stack</span>
      <div class="text-headline-small">No notes</div>
    </div>`;

const disableNoteCreateBtn = function (isThereAnyNotebooks) {
    $noteCreateBtn.forEach($item => {
        $item[isThereAnyNotebooks ? 'removeAttribute' : 'setAttribute']
        ('disabled', '');
    });
}


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
                $notePanel.innerHTML = emptyNoteTemplate;
                disableNoteCreateBtn(true);
        },

        read(notebookList) {
            disableNoteCreateBtn(notebookList.length);

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
                $notePanel.innerHTML = '';
                disableNoteCreateBtn(false);
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
            //Clear emptyNoteTemplate from notePanel if there's no note exists
            if (!$notePanel.querySelector('[data-note]')) $notePanel.innerHTML = '';


            //Append card into notePanel
            const /**{HTMLElement} */ $card = Card(noteData);
            $notePanel.appendChild($card);
        },

        /**
         * @param {Array<Object>} noteList
         */
        read(noteList) {

            if (noteList.length) {
                $notePanel.innerHTML = '';
                
                noteList.forEach(noteData => {
                    const /**{HTMLElement} */ $card = Card(noteData);
                    $notePanel.appendChild($card);
                });
            } else {
                $notePanel.innerHTML = emptyNoteTemplate;
            }
        },

        /**
         * 
         * @param {string} noteid 
         * @param {Object} noteData 
         */
        update(noteid, noteData) {
            const /**{HTMLElement} */ $oldCard = document.querySelector(`[data-note ="${notesId}"]`);

            const /**{HTMLElement} */ $newCard = Card(noteData);
            $notePanel.replaceChild($newCard, $oldCard);
        },

        /**
         * 
         * @param {string} noteId 
         * @param {boolean} isNoteExists 
         */
        delete(noteId, isNoteExists) {
            document.querySelector(`[data-note ="${noteId}"]`).remove();
            if(!isNoteExists) $notePanel.innerHTML = emptyNoteTemplate
        }
    }
}