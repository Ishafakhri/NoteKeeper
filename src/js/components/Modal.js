/**
 * @copyright ishafakhri 2024
 */

'use strict';

const /** {HTMLElement} */ $overlay = document.createElement('div');
$overlay.classList.add('overlay', 'modal-overlay');



/**
 * 
 * @param {string} [title = 'Untitled'] 
 * @param {string} [text = 'Add your Note...'] 
 * @param {string} [time = '']
 * @returns {Object} 
 */
const NoteModal = function (title = 'Untitled', text = 'Add your Note...', time = '') { 
  const /**{HTMLElement} */ $modal = document.createElement('div');
  $modal.classList.add('modal');

  $modal.innerHTML = `
   <button class="icon-btn large" aria-label="Close modal">
        <span class="material-symbols-rounded" aria-hidden="true">close</span>
        <div class="state-layer"></div>
      </button>

      <input type="text" placeholder="Untitled" value="${title}"
      class="modal-title text-title-medium" data-note-field>
      <textarea placeholder="Take a note..." class="modal-text text-body-large custom-scrollbar" data-note-field>${text}</textarea>
      
      <div class="modal-footer">
        <span class="time text-label-large">${time}</span>
        <button class="btn fill" data-submit-btn>
          <span class="text-label-large">Save</span>
          <div class="state-layer"></div>
        </button>
      </div>
    </div>

    <div class="overlay modal-overlay" data-modal-overlay>
    </div>

    <div class="modal">
      <h3 class="modal-title text-title-medium">
        Are you sure want to delete this <strong>"Note title"</strong>?
      </h3>
      <div class="modal-footer">
        <button class="btn text">
          <span class="text-label-large">Cancel</span>
          <div class="state-layer"></div>
        </button>
        <button class="btn fill">
          <span class="text-label-large">Delete</span>
          <div class="state-layer"></div>
        </button>
      </div>
  `;

  const /** {HTMLElement} */ [$titleField, $textField ] = $modal.querySelectorAll('[data-note-field]');
  
  const open = function () { 
    document.body.appendChild($modal);
    document.body.appendChild($overlay);
    $titleField.focus();
  }

  return {open};
}

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
        document.body.removeChild($modal);
        document.body.removeChild($overlay);
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
export { DeleteConfirmModal, open }; 