/**
 * @copyright ishafakhri 2024
 */

'use strict';

const toggleTheme = function () { 
    const /**{string} */ currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const /**{string} */ newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}
/**
 * Initialize the theme
 */
const /**{string | null} */ storedTheme = localStorage.getItem('theme');


const /**{Boolean} */ systemThemeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const /**{string} */ initialTheme = storedTheme ?? (systemThemeDark ? 'dark' : 'light');

document.documentElement.setAttribute('data-theme', initialTheme);

/**
 * Attach toggleTheme to theme button click event
 */

window.addEventListener('DOMContentLoaded', function () {
    const /**{HTMLElement} */ $themeButton = document.querySelector('[data-theme-btn]');
    if($themeButton) $themeButton.addEventListener('click', toggleTheme);
});