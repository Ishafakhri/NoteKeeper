/**
 * @copyright ishafakhri 2024
 */

'use strict';

/**
 * Module Imports
 */
import { addEventOnElements,getGreetingMsg } from "./utils.js";
import { Tooltip } from "./components/Tooltip.js";

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