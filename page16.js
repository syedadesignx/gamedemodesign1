const sliders = document.querySelectorAll('.slider');
const container = document.querySelector('.slider-container');

let draggedItem = null;

sliders.forEach(slider => {
  slider.addEventListener('dragstart', function (e) {
    draggedItem = this;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", this.dataset.index || ""); 
    setTimeout(() => this.classList.add('hidden'), 0); // Hide while dragging
  });

  slider.addEventListener('dragend', function () {
    draggedItem = null;
    this.classList.remove('hidden');
  });
});

container.addEventListener('dragover', function (e) {
  e.preventDefault();
  const afterElement = getDragAfterElement(container, e.clientY);
  if (!afterElement) {
    container.appendChild(draggedItem);
  } else {
    container.insertBefore(draggedItem, afterElement);
  }
});

container.addEventListener('drop', function (e) {
  e.preventDefault();
});

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.slider:not(.hidden)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
}
