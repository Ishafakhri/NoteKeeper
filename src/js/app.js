/**
 * @copyright ishafakhri 2024
 */

'use strict';

/**
 * Module Imports
 */
import { addEventOnElements,getGreetingMsg } from "./utils.js";


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
 * Show greeting message
 */
const /** {HTMLElement} */ $greeting = document.querySelector('[data-greeting]');
const /**  {number} */ currentHour = new Date().getHours();
$greeting.textContent = getGreetingMsg(currentHour);