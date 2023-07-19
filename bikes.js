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
	var editableElements = document.querySelectorAll(
		".bike-card-title, .bike-card-text, .bike-card-price"
	);
	for (var i = 0; i < editableElements.length; i++) {
		var element = editableElements[i];
		element.contentEditable = false;
	}

	// Get the current container and remove its ID
	var currentContainer = document.getElementById("bikeCardTemplate");

	// Create a new bike card container
	var newContainer = document.createElement("div");
	newContainer.classList.add("bike-card-container");

	// Clone the existing bike card template and append it to the new container
	var template = currentContainer.cloneNode(true);
	newContainer.appendChild(template);

	// Update the button text and remove the IDs onclickfunction
	let saveButton = newContainer.querySelector("#saveButton");
	let resetButton = newContainer.querySelector("#resetButton");
	let cardEdit = newContainer.querySelector("#cardBodyEdit");
	let logoBox = newContainer.querySelector("#logoBox");
	let imageBox = newContainer.querySelector("#imageBox");
	saveButton.textContent = "Book Now";
	resetButton.textContent = "See Details";
	cardEdit.onclick = null;
	saveButton.onclick = null;
	resetButton.onclick = null;
	logoBox.onclick = null;
	imageBox.onclick = null;
	resetCardValues();

	// Make the text content non-editable in the new container
	var nonEditableElements = newContainer.querySelector(
		".bike-card-title, .bike-card-text, .bike-card-price"
	);
	nonEditableElements.contentEditable = false;

	//store new card created to sessionStorage
	var cardContainerHTML = newContainer.outerHTML;
	var savedContainers =
		JSON.parse(sessionStorage.getItem("bikeCardContainers")) || [];
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
	var savedContainers = JSON.parse(
		sessionStorage.getItem("bikeCardContainers")
	);
	if (savedContainers && savedContainers.length > 0) {
		for (var i = 0; i < savedContainers.length; i++) {
			var savedContainer = savedContainers[i];

			var containerWrapper = document.createElement("div");
			containerWrapper.innerHTML = savedContainer;
			var savedCard = containerWrapper.firstChild;

			var currentContainer = document.getElementById("bikeCardTemplate");
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
	bikeCardTitle.innerText = "Bike Name";
	bikeCardText.innerText = "Transmission";
	bikeCardPrice.innerText = "Amount";

	const logoBox = document.getElementById("logoBox");
	const logoUrl =
		"https://cdn.vectorstock.com/i/preview-1x/76/79/your-logo-here-placeholder-symbol-vector-26077679.jpg";
	const logoHTML = '<img id="bikelogo" src="' + logoUrl + '" alt="bikelogo" />';
	logoBox.innerHTML = logoHTML;
	const imageBox = document.getElementById("imageBox");
	const imageUrl =
		"https://www.kindpng.com/picc/m/564-5640631_file-antu-insert-image-svg-insert-image-here.png";
	const imageHTML =
		'<img id="bikelogo" src="' + imageUrl + '" alt="bikelogo" />';
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

// Example usage
var myElement = document.getElementById("terms");
enterFullscreen(myElement);