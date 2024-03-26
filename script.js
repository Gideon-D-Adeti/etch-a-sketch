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

    sketchArea.appendChild(box);

    // Add event listener for coloring and shading effect
    box.addEventListener("mouseenter", () => {
      if (box.style.backgroundColor === "rgb(255, 255, 255)") {
        const initialColor = getRandomColor();
        box.style.backgroundColor = initialColor;
        const stepValues = calculateSteps(initialColor);
        box.stepValues = stepValues;
      }
      darkenBox(box);
    });
  }
}

// Function to get random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to calculate step values for RGB components
function calculateSteps(color) {
  // Convert hexadecimal color to RGB
  const rgbColor = hexToRgb(color);

  // Parse the RGB values
  const matches = rgbColor.match(/\d+/g);
  const r = parseInt(matches[0]);
  const g = parseInt(matches[1]);
  const b = parseInt(matches[2]);

  // Calculate step values based on RGB components
  const rStep = Math.max(1, Math.ceil(r / 10)); // Calculate step for R component
  const gStep = Math.max(1, Math.ceil(g / 10)); // Calculate step for G component
  const bStep = Math.max(1, Math.ceil(b / 10)); // Calculate step for B component

  return { rStep, gStep, bStep }; // Return an object containing step values
}

// Function to convert hexadecimal color to RGB
function hexToRgb(hexColor) {
  // Remove '#' if present
  hexColor = hexColor.replace(/^#/, "");

  // Convert 3-digit hex to 6-digit hex
  if (hexColor.length === 3) {
    hexColor = hexColor
      .split("")
      .map(function (hex) {
        return hex + hex;
      })
      .join("");
  }

  // Extract RGB components
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  // Return RGB color in "rgb(r, g, b)" format
  return `rgb(${r}, ${g}, ${b})`;
}

// Function to darken the box
function darkenBox(box) {
  // Get the current background color of the box
  const currentColor = box.style.backgroundColor;

  // Parse the RGB values from the current color
  const matches = currentColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  let r = parseInt(matches[1]);
  let g = parseInt(matches[2]);
  let b = parseInt(matches[3]);

  // Get the step values for this box
  const { rStep, gStep, bStep } = box.stepValues;

  // Darken the color by reducing each RGB component by the corresponding step value
  r = Math.max(0, r - rStep);
  g = Math.max(0, g - gStep);
  b = Math.max(0, b - bStep);

  // Set the new background color
  box.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

// Initial grid generation
generateGrid(gridSize);

// Event listener for changing grid size
changeGridSizeButton.addEventListener("click", () => {
  let newSize;
  do {
    newSize = +prompt("Enter any number from 1 to 100:");
  } while (isNaN(newSize) || newSize < 1 || newSize > 100);

  gridSize = newSize;
  generateGrid(gridSize);
});
