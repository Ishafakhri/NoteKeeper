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

export{
    addEventOnElements,
    getGreetingMsg
}