/**
 * @copyright ishafakhri 2024
 */

'use strict';

/**
 * Module Import
 */
import { addEventOnElements } from 'utils.js';
/**
 * Toggle sidebar
 */
const /** {HTMLElement} */ $sidebar = document.querySelector('[data-sidebar]');

const /** {Array<HTMLElement>} */ $sidebarTogglers = document.querySelector('[data-sidebar-toggler]');

const /** {HTMLElement} */ $overlay = document.querySelector('[data-sidebar-overlay]');

addEventOnElements($sidebarTogglers, 'click', function () {
    $sidebar.classList.toggle('active');
    $overlay.classList.toggle('active');
});