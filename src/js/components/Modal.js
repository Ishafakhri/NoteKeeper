/**
 * @copyright ishafakhri 2024
 */

'use strict';

const /** {HTMLElement} */ $overlay = document.createElement('div');
$overlay.classList.add('overlay', 'modal-overlay');

/**
 * 
 * @param {string} title
 * @returns {Object} 
 */

const DeleteConfirmModal = function (title) { 
    const /** {HTMLElement} */ $modal = document.createElement('div');
    $modal.classList.add('modal');
    $modal.innerHTML = `
    
      <h3 class="modal-title text-title-medium">
        Are you sure want to delete this <strong>"${title}"</strong>?
      </h3>
      <div class="modal-footer">
        <button class="btn text" data-action-btn="false">
          <span class="text-label-large">Cancel</span>
          <div class="state-layer"></div>
        </button>
        <button class="btn fill" data-action-btn="true">
          <span class="text-label-large">Delete</span>
          <div class="state-layer"></div>
        </button>
      </div>

    `;

    /**
     * Opens the delete confirmation modal by appending it to the body
     */
    const open = function () { 
        document.body.appendChild($modal);
        document.body.appendChild($overlay);
    }

    /**
     * closes the delete confirmation modal by removing it from the body
     */
    const close = function () {
        document.body.appendChild($modal);
        document.body.appendChild($overlay);
    }

    const /** {Array<HTMLElement></HTMLElement>}*/ $actionButton =
    $modal.querySelectorAll('[data-action-btn]'); 



    /**
     * 
     * @param {Function} callback 
     */
    const onSubmit = function (callback) {
        $actionButton.forEach($btn => $btn.addEventListener('click', function () {
                const /** {boolean} */ isDelete = this.dataset.actionBtn === 'true' ? true : false;
                callback(isDelete);
            }));
    }

    return {open, close, onSubmit};
}
export { DeleteConfirmModal };