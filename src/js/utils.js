/**
 * @copyright ishafakhri 2024
 */

'use strict';

/**
 * 
 * @param {Array<HTMLElement></HTMLElement>} $elements 
 * @param {string} eventType 
 * @param {Function} callback 
 */

const addEventOnElements = function ($elements, eventType, callback) {
    console.log($elements);
    $elements.forEach($element => {
        $element.addEventListener(eventType, callback);
    });
}
/**
 * 
 * @param {number} currentHour 
 * @returns {string}
 */
const getGreetingMsg = function (currentHour) {
    const /** {string} */ greeting = currentHour < 12 ? 'Good Morning' : 
    currentHour < 18 ? 'Good Afternoon' 
    : 'Good Evening';

    return  greeting;
}

let /** {HTMLElement | undefined} */ $lastActiveNavItem;

const activeNotebook = function () {
    $lastActiveNavItem?.classList.remove('active');
    this.classList.add('active'); //this : $navItem
    $lastActiveNavItem = this;  //this : $navItem
}

/**
 * @param {HTMLElement} $element
 */
const makeElemEditable = function ($element) {
    $element.setAttribute('contenteditable', true);
    $element.focus();
}
/**
 * 
 * @returns {string}
 */
const generateID = function () {
    return new Date().getTime().toString();
}

/**
 * 
 * @param {Object} db 
 * @param {string} notebookId 
 * @returns {Object | undefined}
 */

const findNotebook = function (db, notebookId) { 
    return db.notebooks.find(notebook => notebook.id === notebookId);
}


/**
 * 
 * @param {Object} db 
 * @param {string} notebookId
 * @returns {number} 
 */
const findNotebookIndex = function (db, notebookId) { 
    return db.notebooks.findIndex(item => item.id === notebookId);
}

/**
 * 
 * @param {number} miliseconds 
 * @returns {string}
 */
const getRelativeTime = function (miliseconds) {
    const /** {Number} */currenttTime = new Date().getTime();

    const /** {Number} */ minute = Math.floor((currenttTime - miliseconds) / 1000 / 60);

    const /** {Number} */ hour = Math.floor(minute / 60);

    const /** {Number} */ day = Math.floor(hour / 24);

    return minute < 1 ? 'Just Now' : minute < 60 ? `${minute} min ago` :
           hour < 24 ? `${hour} hour ago` : `${day} day ago`;
}

/**
 * 
 * @param {Object} db 
 * @param {string} noteId
 * @returns {Object | undefined} 
 */
const findNote = (db, noteId) => {
    let note;
    for (const notebook of db.notebooks) {
        note = notebook.notes.find(note => note.id === noteId);
        if (note) break;
    }
    return note;
}   

/**
 * 
 * @param {Object} notebook
 * @param {string} noteId 
 * @returns {number}
 */
const findNoteIndex = function (notebook, noteId) {
    return notebook.notes.findIndex(note => note.id === noteId);
}

export{
    addEventOnElements,
    getGreetingMsg,
    activeNotebook,
    makeElemEditable,
    generateID,
    findNotebook,
    findNotebookIndex,
    getRelativeTime,
    findNote,
    findNoteIndex
}