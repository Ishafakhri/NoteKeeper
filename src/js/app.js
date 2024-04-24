/**
 * @copyright ishafakhri 2024
 */

'use strict';

/**
 * Module Imports
 */
import { addEventOnElements,getGreetingMsg, activeNotebook, makeElemEditable } from "./utils.js";
import { Tooltip } from "./components/Tooltip.js";
import { db } from "./db.js";
import { client } from "./client.js";
/**
 * Toggle sidebar
 */
const /** {HTMLElement} */ $sidebar = document.querySelector('[data-sidebar]');

const /** {Array<HTMLElement>} */ $sidebarTogglers = document.querySelectorAll('[data-sidebar-toggler]');

const /** {HTMLElement} */ $overlay = document.querySelector('[data-sidebar-overlay]');

addEventOnElements($sidebarTogglers, 'click', function () {
    $sidebar.classList.toggle('active');
    $overlay.classList.toggle('active');
});

/**
 * Initialize tooltip behavior for all DOM elemenets with data-tooltip atr
 */
const /** {Array<HTMLElement>} */ $tooltips = document.querySelectorAll('[data-tooltip]');
$tooltips.forEach($elem => Tooltip($elem));

/**
 * Show greeting message
 */
const /** {HTMLElement} */ $greeting = document.querySelector('[data-greeting]');
const /**  {number} */ currentHour = new Date().getHours();
$greeting.textContent = getGreetingMsg(currentHour);

/**
 * Show current date
 */
const /** {HTMLElement} */ $currentDate = document.querySelector('[data-current-date]');
$currentDate.textContent = new Date().toDateString().replace(' ',', ');

/**
 * Notebook create field
 */
const /** {HTMLElement} */ $sidebarList = document.querySelector('[data-sidebar-list]');
const /** {HTMLElement} */ $addNotebook = document.querySelector('[data-add-notebook]');

const showNotebookField = function () {
    const /** {HTMLElement} */ $navItem= document.createElement('div');
    $navItem.classList.add('nav-item');

    $navItem.innerHTML =`
        <span class="text text-label-large" data-notebook-field></span>
        <div class="state-layer"></div>
    `;
    $sidebarList.appendChild($navItem);

    const /** {HTMLElement} */ $navItemField = $navItem.querySelector('[data-notebook-field]');

    //Active new vreated notebook and deactive the last one
    activeNotebook.call($navItem);

    //Make notebook field content editable and focus
    makeElemEditable($navItemField);

    //when user press "enter" then create new notebook
    $navItemField.addEventListener('keydown', createNotebook);
}
$addNotebook.addEventListener('click', showNotebookField);

const createNotebook = function (event) {
    if(event.key === 'Enter'){
        //store new note in database
        const /** {Object} */ notebookData = db.post.notebook(this.textContent || 'Untitled'); //this: $navItemField
        this.parentElement.remove();

        //render navItem
        client.notebook.create(notebookData);
    }
}

/**
 * Renders the notebook list from the database & passing to client
 */

const renderExisted = function () {
    const /** {Array} */ notebookList = db.get.notebooks();
    client.notebook.read(notebookList);
}

renderExisted();