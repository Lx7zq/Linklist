let carriageCount = 0;
let dragged;

document.addEventListener('DOMContentLoaded', (event) => {
  const train = document.getElementById("train");

  window.addCarriage = function () {
    if (carriageCount === 1) {
      const trainHead = document.createElement("img");
      trainHead.src = "Train-head.png";
      trainHead.alt = "Train Head";
      train.appendChild(trainHead);
    }

    const trainTails = train.querySelectorAll("img[alt='Train Tail']");
    trainTails.forEach((tail) => tail.remove());

    carriageCount++;
    const newCarriage = document.createElement("div");
    newCarriage.className = "carriage";
    newCarriage.setAttribute("draggable", true);
    newCarriage.id = "carriage" + carriageCount;
    newCarriage.textContent = "Carriage " + carriageCount;

    const trainTail = document.createElement("img");
    trainTail.src = "Train-tail.png";
    trainTail.alt = "Train Tail";
    train.appendChild(trainTail);
    train.appendChild(newCarriage);
    addDragEvents(newCarriage);
  };

  const addDragEvents = (item) => {
    item.addEventListener("dragstart", (e) => {
      dragged = item;
      e.dataTransfer.setData("text/plain", item.id);
    });
  };

  train.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  train.addEventListener("drop", (e) => {
    e.preventDefault();
    if (dragged && e.target.className === "carriage") {
      const afterElement = getDragAfterElement(train, e.clientX);
      if (afterElement == null) {
        train.appendChild(dragged);
      } else {
        train.insertBefore(dragged, afterElement);
      }
    }
  });

  function getDragAfterElement(container, x) {
    const draggableElements = [
      ...container.querySelectorAll(".carriage:not(.dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.width / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
});
