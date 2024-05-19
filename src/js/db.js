/**
 * @copyright ishafakhri 2024
 */

'use strict';


/**
 * Import Module
 */
import { generateID, findNotebook, findNotebookIndex } from "./utils.js";


//DB Object
let /** {Object} */ notekeeperDB = {};

const initDB = function () {
    const /**{JSON | undefined} */ db = localStorage.getItem('notekeeperDB');
    if(db){
        notekeeperDB = JSON.parse(db);
    }else{
        notekeeperDB.notebooks = [];
        localStorage.setItem('notekeeperDB', JSON.stringify(notekeeperDB));
    }
}
initDB();

/**
 * Reads and loads the localStorage data in to the global variable notekeeperDB
 */
const readDB = function () {
    notekeeperDB = JSON.parse(localStorage.getItem('notekeeperDB'));
}

/**
 * write the current state of the global var
 */
const writeDB = function () {
    localStorage.setItem('notekeeperDB', JSON.stringify(notekeeperDB));

}

/**
 * 
 * @namespace 
 * @property {Object} get
 * @property {Object} post
 * @property {Object} update
 * @property {Object} delete
 */
export const db = {
    post : {
        /**
         * @function
         * @param {string} name
         * @returns {Object} 
         */
        notebook(name){
            readDB();
            const /** {Object} */ notebookData = {
                id : generateID(),
                name,
                notes : []
            }
            notekeeperDB.notebooks.push(notebookData);
            writeDB();

            return notebookData;
        },

        /**
         * 
         * @param {string} notebookID 
         * @param {Object} object
         * @returns {Object} 
         */
        note(notebookId, object) {
            readDB();

            const /**{Object} */ notebook = findNotebook(notekeeperDB, notebookId);
            const /**{Object} */ noteData = {
                id : generateID(),
                notebookId,
                ...object,
                postedOn : new Date().getTime()
            }
            notebook.notes.unshift(noteData);
            writeDB();
        }


    },

    get : {
        /**
         * @function
         * @returns {Array<Object>}
         */
        notebooks(){
            readDB();
            return notekeeperDB.notebooks;
        }
    },
    
    update: {
        
        /**
         * @function
         * @param {string} notebookId 
         * @param {string} name
         * @returns {Object} 
         */


        notebook(notebookId, name){
            readDB();
            const /** {Object} */ notebook = findNotebook(notekeeperDB, notebookId);
            notebook.name = name;
            writeDB();

            return notebook;
            
        }
    },

    delete: {

        /**
         * @function
         * @param {string} notebookId 
         */
        notebook(notebookId) {
            readDB();

            const /**{Number} */ notebookIndex = findNotebookIndex(notekeeperDB, notebookId);
            notekeeperDB.notebooks.splice(notebookIndex, 1);

            writeDB();
        }    
    }
    
};