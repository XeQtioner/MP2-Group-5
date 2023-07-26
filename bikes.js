// Logo uploader
function updateLogo() {
	var logoUrl = prompt("Please provide the logo image URL:");
	if (logoUrl !== null && logoUrl.trim() !== "") {
		var img = new Image();
		img.onload = function () {
			displayLogo(img);
		};
		img.onerror = function () {
			alert("Failed to load logo image from URL.");
		};
		img.src = logoUrl;
	} else {
		var fileInput1 = document.createElement("input");
		fileInput1.type = "file";
		fileInput1.accept = "image/*";
		fileInput1.addEventListener("change", handleLogoFileSelection);
		fileInput1.click();
	}
}

function handleLogoImageDrop(e) {
	e.preventDefault();
	var file = e.dataTransfer.files[0];
	if (file.type.match("image.*")) {
		readAndDisplayLogo(file);
	} else {
		alert("Please drop a logo image file.");
	}
}

function handleLogoImageDragOver(e) {
	e.preventDefault();
}

var logoBox = document.getElementById("logoBox");
logoBox.addEventListener("drop", handleLogoImageDrop, false);
logoBox.addEventListener("dragover", handleLogoImageDragOver, false);

function handleLogoFileSelection(e) {
	var fileInput = e.target;
	if (fileInput.files.length > 0) {
		var file = fileInput.files[0];
		if (file.type.match("image.*")) {
			readAndDisplayLogo(file);
		} else {
			alert("Please select a logo image file.");
		}
	} else {
		alert("Please select a logo image file.");
	}
}

function readAndDisplayLogo(file) {
	var reader = new FileReader();
	reader.onload = function (event) {
		var logoBox = document.getElementById("logoBox");
		logoBox.innerHTML = "";
		var img = new Image();
		img.onload = function () {
			displayLogo(img);
		};
		img.src = event.target.result;
	};
	reader.readAsDataURL(file);
}

function displayLogo(img) {
	var logoBox = document.getElementById("logoBox");
	logoBox.innerHTML = "";
	logoBox.appendChild(img);
}

let currentLogoScale = 1;

// Function to resize the ;ogo
function resizeLogo(operation) {
	// Get the image element
	const logoBox = document.getElementById("logoBox");
	const img = logoBox.querySelector("img");

	// Check if an image is displayed
	if (!img) {
		alert("No image to resize.");
		return;
	}

	// Calculate the new scale based on the operation ("+" or "-")
	const scaleFactor = 0.02; // You can adjust the resize step as per your requirements

	if (operation === "+") {
		currentLogoScale += scaleFactor;
	} else if (operation === "-") {
		currentLogoScale -= scaleFactor;
	}

	// Apply the new scale to the logo
	img.style.transform = `scale(${currentLogoScale})`;
}



// Image uploader
function updateImage() {
	var imageUrl = prompt("Please provide the image URL:");
	if (imageUrl !== null && imageUrl.trim() !== "") {
		var img = new Image();
		img.onload = function () {
			displayImage(img);
		};
		img.onerror = function () {
			alert("Failed to load image from URL.");
		};
		img.src = imageUrl;
	} else {
		var fileInput = document.createElement("input");
		fileInput.type = "file";
		fileInput.accept = "image/*";
		fileInput.addEventListener("change", handleImageFileSelection);
		fileInput.click();
	}
}

function handleImageDrop(e) {
	e.preventDefault();
	var file = e.dataTransfer.files[0];
	if (file.type.match("image.*")) {
		readAndDisplayImage(file);
	} else {
		alert("Please drop an image file.");
	}
}

function handleImageDragOver(e) {
	e.preventDefault();
}

var imageBox = document.getElementById("imageBox");
imageBox.addEventListener("drop", handleImageDrop, false);
imageBox.addEventListener("dragover", handleImageDragOver, false);

function handleImageFileSelection(e) {
	var fileInput = e.target;
	if (fileInput.files.length > 0) {
		var file = fileInput.files[0];
		if (file.type.match("image.*")) {
			readAndDisplayImage(file);
		} else {
			alert("Please select an image file.");
		}
	} else {
		alert("Please select an image file.");
	}
}

function readAndDisplayImage(file) {
	var reader = new FileReader();
	reader.onload = function (event) {
		var imageBox = document.getElementById("imageBox");
		imageBox.innerHTML = "";
		var img = new Image();
		img.onload = function () {
			displayImage(img);
		};
		img.src = event.target.result;
	};
	reader.readAsDataURL(file);
}

function displayImage(img) {
	var imageBox = document.getElementById("imageBox");
	imageBox.innerHTML = "";
	imageBox.appendChild(img);

	// Enable dragging after displaying the image
	enableImageDragging();
}

// Keep a variable to store the current scale of the image
let currentScale = 1;

// Function to resize the image
function resizeImage(operation) {
	// Get the image element
	const imageBox = document.getElementById("imageBox");
	const img = imageBox.querySelector("img");

	// Check if an image is displayed
	if (!img) {
		alert("No image to resize.");
		return;
	}

	// Calculate the new scale based on the operation ("+" or "-")
	const scaleFactor = 0.02; // You can adjust the resize step as per your requirements

	if (operation === "+") {
		currentScale += scaleFactor;
	} else if (operation === "-") {
		currentScale -= scaleFactor;
	}

	// Apply the new scale to the image
	img.style.transform = `scale(${currentScale})`;
}

var originalValues = {}; // Store original values for reset

function editCardBody(event) {
	var clickedElement = event.target;

	// Check if the clicked element is editable
	if (
		!clickedElement.matches(".bike-card-title") &&
		!clickedElement.matches(".bike-card-text") &&
		!clickedElement.matches(".bike-card-price")
	) {
		return; // Ignore clicks on non-editable elements
	}

	// Enable editing mode
	clickedElement.contentEditable = true;

	// Focus on the editable element for convenience
	clickedElement.focus();

	// Save the original value for resetting
	originalValues[clickedElement.id] = clickedElement.innerText;

	// Save changes when the user presses Enter key
	clickedElement.addEventListener("keydown", function (event) {
		if (event.key === "Enter") {
			event.preventDefault(); // Prevent line break insertion
			saveCardValues();
		}
	});
}

function saveCardValues() {
	// Disable editing mode and remove the border
	const editableElements = document.querySelectorAll(
		".bike-card-title, .bike-card-text, .bike-card-price"
	);
	for (let i = 0; i < editableElements.length; i++) {
		const element = editableElements[i];
		element.contentEditable = false;
	}

	// Get the current container and remove its ID
	const currentContainer = document.getElementById("bikeCardTemplate");

	// Create a new bike card container
	const newContainer = document.createElement("div");
	newContainer.classList.add("bike-card-container");

	// Clone the existing bike card template and append it to the new container
	const template = currentContainer.cloneNode(true);
	newContainer.appendChild(template);

	// Generate the new ID in camelCase format
	const bikeCardTitle = template.querySelector(".bike-card-title");
	const newTitle = bikeCardTitle.textContent.trim().replace(/\s+/g, '');
	const nthChildNumber = document.querySelectorAll(".bike-card-container").length + 1;
	const newID = "unit" + nthChildNumber + "_" + newTitle.charAt(0).toUpperCase() + newTitle.slice(1);

	// Replace the old ID with the new formatted ID
	newContainer.id = newID;

	// Update the button text and remove the IDs onclick function
	const saveButton = newContainer.querySelector("#saveButton");
	const resetButton = newContainer.querySelector("#resetButton");
	const cardEdit = newContainer.querySelector("#cardBodyEdit");
	const logoBox = newContainer.querySelector("#logoBox");
	const imageBox = newContainer.querySelector("#imageBox");
	const sizeMinusLogo = newContainer.querySelector("#sizeMinusLogo");
	const sizePlusLogo = newContainer.querySelector("#sizePlusLogo");
	const sizeMinusImage = newContainer.querySelector("#sizeMinusImage");
	const sizePlusImage = newContainer.querySelector("#sizePlusImage");
	saveButton.textContent = "Book Now";
	resetButton.textContent = "See Details";
	cardEdit.onclick = null;
	saveButton.onclick = null;
	resetButton.onclick = null;
	logoBox.onclick = null;
	imageBox.onclick = null;
	sizeMinusLogo.style.display = "none";
	sizePlusLogo.style.display = "none";
	sizeMinusImage.style.display = "none";
	sizePlusImage.style.display = "none";
	resetCardValues();

	// Make the text content non-editable in the new container
	const nonEditableElements = newContainer.querySelector(
		".bike-card-title, .bike-card-text, .bike-card-price"
	);
	nonEditableElements.contentEditable = false;

	// Store the new card created to sessionStorage
	const cardContainerHTML = newContainer.outerHTML;
	const savedContainers = JSON.parse(sessionStorage.getItem("bikeCardContainers")) || [];
	savedContainers.push(cardContainerHTML);
	sessionStorage.setItem("bikeCardContainers", JSON.stringify(savedContainers));

	// Insert the new container after the current container
	currentContainer.parentNode.insertBefore(
		newContainer,
		currentContainer.nextSibling
	);
}

// Retrieve the saved bike card containers from local storage on page load
document.addEventListener("DOMContentLoaded", function () {
	const savedContainers = JSON.parse(sessionStorage.getItem("bikeCardContainers"));
	if (savedContainers && savedContainers.length > 0) {
		for (let i = 0; i < savedContainers.length; i++) {
			const savedContainer = savedContainers[i];

			const containerWrapper = document.createElement("div");
			containerWrapper.innerHTML = savedContainer;
			const savedCard = containerWrapper.firstChild;

			const currentContainer = document.getElementById("bikeCardTemplate");
			currentContainer.parentNode.insertBefore(
				savedCard,
				currentContainer.nextSibling
			);
		}
	}
});

// Function to reset the card values
function resetCardValues() {
	const bikeCardTitle = document.getElementById("bikeCardTitle");
	const bikeCardText = document.getElementById("bikeCardText");
	const bikeCardPrice = document.getElementById("bikeCardPrice");

	// Reset to the original values
	bikeCardTitle.innerText = "Bike Name (editable)";
	bikeCardText.innerText = "Transmission (editable)";
	bikeCardPrice.innerText = "Amount (editable)";

	const logoBox = document.getElementById("logoBox");
	const logoUrl = "https://cdn.vectorstock.com/i/preview-1x/76/79/your-logo-here-placeholder-symbol-vector-26077679.jpg";
	const logoHTML = '<img id="bikelogo" src="' + logoUrl + '" alt="bikelogo" />';
	logoBox.innerHTML = logoHTML;
	const imageBox = document.getElementById("imageBox");
	const imageUrl = "https://www.kindpng.com/picc/m/564-5640631_file-antu-insert-image-svg-insert-image-here.png";
	const imageHTML = '<img id="bikelogo" src="' + imageUrl + '" alt="bikelogo" />';
	imageBox.innerHTML = imageHTML;
}
function enterFullscreen(element) {
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.mozRequestFullScreen) {
		// Firefox
		element.mozRequestFullScreen();
	} else if (element.webkitRequestFullscreen) {
		// Chrome, Safari and Opera
		element.webkitRequestFullscreen();
	} else if (element.msRequestFullscreen) {
		// Internet Explorer/Edge
		element.msRequestFullscreen();
	}
}

// var myElement = document.getElementById("terms");
enterFullscreen(myElement);
