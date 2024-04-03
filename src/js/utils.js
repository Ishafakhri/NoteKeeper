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

export{
    addEventOnElements
}