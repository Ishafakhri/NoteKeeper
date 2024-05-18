/**
 * @copyright ishafakhri 2024
 */

'use strict';

/**
 * Import
*/
import { Tooltip } from "./Tooltip.js";
import { activeNotebook, makeElemEditable } from "../utils.js";

const /** {HTMLElement} */ $notePanelTitle = document.querySelector('[data-note-panel-title]');

/**
 * 
 * @param {string} id 
 * @param {string} name 
 * @returns {HTMLElement}
 */
export const NavItem = function (id, name) {
    const /** {HTMLElement} */ $navItem = document.createElement('div');
    $navItem.classList.add('nav-item');
    $navItem.setAttribute('data-notebook', id);
    $navItem.innerHTML = `
     <span class="text text-label-large" data-notebook-field>${name}</span>
        <button class="icon-btn small" aria-label="Edit Notebook" data-tooltip="Edit Notebook" edit-data-btn>
          <span class="material-symbols-rounded" aria-hidden="true">edit</span>
          <div class="state-layer"></div>
        </button>

        <button class="icon-btn small" aria-label="Delete Notebook" data-tooltip="Delete Notebook" delete-data-btn>
          <span class="material-symbols-rounded" aria-hidden="true">delete</span>
          <div class="state-layer"></div>
        </button>
        <div class="state-layer"></div>
    `;

    // show tooltip on edit and delete button
    const /** {Array<HTMLElement>} */ $tooltipElems = $navItem.querySelectorAll('[data-tooltip]');
    $tooltipElems.forEach($elem => Tooltip($elem));

    $navItem.addEventListener('click', function(){
        $notePanelTitle.textContent = name;
        activeNotebook.call(this);
    });

/**
 * Notebook Edit Functionality
 */
  const /** {HTMLElement} */ $navItemEditBtn = $navItem.querySelector('[edit-data-btn]');
  const /** {HTMLElement} */ $navItemField = $navItem.querySelector('[data-notebook-field]');

  $navItemEditBtn.addEventListener('click', makeElemEditable.bind(null, $navItemField));
  
  $navItemField.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      this.removeAttribute('contenteditable');

      //update edited data in database
      
    }
  });

  return $navItem;
}