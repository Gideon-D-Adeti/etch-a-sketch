const sketchArea = document.querySelector("#sketch");
const changeGridSizeButton = document.querySelector("#button");
let gridSize = 16;

// Function to generate grid
function generateGrid(gridSize) {
  sketchArea.innerHTML = "";

  const sketchAreaWidth = sketchArea.clientWidth;
  const boxSize = sketchAreaWidth / gridSize;

  for (let i = 0; i < gridSize * gridSize; i++) {
    const box = document.createElement("div");

    box.style.width = `${boxSize}px`;
    box.style.height = `${boxSize}px`;
    box.style.backgroundColor = "#fff";
    box.style.border = "1px solid #000";

    sketchArea.appendChild(box);
  }
}

// Initial grid generation
generateGrid(gridSize);