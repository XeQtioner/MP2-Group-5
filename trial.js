//logo uploader
function updateLogo() {
  var imageUrl = prompt("Enter the image URL or leave it empty to browse for media:");
  if (imageUrl) {
    var imgElement = document.getElementById("bikelogo");
    imgElement.src = imageUrl;
  } else {
    // Browse for media functionality
    var fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = function(event) {
      var file = event.target.files[0];
      if (file) {
        var reader = new FileReader();
        reader.onload = function() {
          var imgElement = document.getElementById("bikelogo");
          imgElement.src = reader.result;
        };
        reader.readAsDataURL(file);
      }
    };

    fileInput.click();
  }
}

function handleDrop(e) {
  e.preventDefault();
  let file1 = e.dataTransfer.files[0];
  if (file1.type.match("image.*")) {
    let reader = new FileReader();
    reader.onload = function (event) {
      let dropBoxLogo = document.getElementById("logoBox");
      dropBoxLogo.innerHTML = "";
      let img = new Image();
      img.src = event.target.result;
      dropBoxLogo.appendChild(img);
    };
    reader.readAsDataURL(file1); 
  } else {
    alert("Please drop an image file.");
  }
}

function handleDragOver(e) {
  e.preventDefault();
};

let dropBoxLogo = document.getElementById("logoBox");
dropBoxLogo.addEventListener("drop", handleDrop, false);
dropBoxLogo.addEventListener("dragover", handleDragOver, false);





//image uploader

function updateImage() {
  var imageUrl = prompt("Enter the image URL or leave it blank to browse for media:");
  if (imageUrl) {
    var imgElement = document.getElementById("bikeCardImg");
    imgElement.src = imageUrl;
  } else {
    // Browse for media functionality
    var fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = function(event) {
      var file = event.target.files[0];
      if (file) {
        var reader = new FileReader();
        reader.onload = function() {
          var imgElement = document.getElementById("bikeCardImg");
          imgElement.src = reader.result;
        };
        reader.readAsDataURL(file);
      }
    };

    fileInput.click();
  }
}



function handleDrop2(e) {
  e.preventDefault();
  var file = e.dataTransfer.files[0];
  if (file.type.match("image.*")) {
    var reader = new FileReader();
    reader.onload = function (event) {
      var dropBox = document.getElementById("imageBox");
      dropBox.innerHTML = "";
      var img = new Image();
      img.src = event.target.result;
      dropBox.appendChild(img);
    };
    reader.readAsDataURL(file);
  } else {
    alert("Please drop an image file.");
  }
}

function handleDragOver2(e) {
  e.preventDefault();
}

var dropBox = document.getElementById("imageBox");
dropBox.addEventListener("drop", handleDrop2, false);
dropBox.addEventListener("dragover", handleDragOver2, false);


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
  clickedElement.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent line break insertion
      saveCardValues();
    }
  });

}

function saveCardValues() {
  // Disable editing mode and remove the border
  var editableElements = document.querySelectorAll(".bike-card-title, .bike-card-text, .bike-card-price");
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

  // Update the button text and remove the IDs
  var saveButton = newContainer.querySelector("#saveButton");
  var resetButton = newContainer.querySelector("#resetButton");
  var cardEdit = newContainer.querySelector("#cardBodyEdit");
  saveButton.textContent = "Book Now";
  resetButton.textContent = "See Details";
  saveButton.removeAttribute("id");
  resetButton.removeAttribute("id");
  saveButton.onclick = null;
  resetButton.onclick = null;
  cardEdit.removeAttribute("onclick");


  // Make the text content non-editable in the new container
  var nonEditableElements = newContainer.querySelector(".bike-card-title, .bike-card-text, .bike-card-price")

  nonEditableElements.contentEditable = false;
  nonEditableElements.style.border = "none";
  location.reload()


  var cardContainerHTML = newContainer.outerHTML;
  var savedContainers = JSON.parse(sessionStorage.getItem("bikeCardContainers")) || [];
  savedContainers.push(cardContainerHTML);
  sessionStorage.setItem("bikeCardContainers", JSON.stringify(savedContainers));
    

  // Insert the new container after the current container
  currentContainer.parentNode.insertBefore(newContainer, currentContainer.nextSibling);

}
// Retrieve the saved bike card containers from local storage on page load
document.addEventListener("DOMContentLoaded", function() {
  var savedContainers = JSON.parse(sessionStorage.getItem("bikeCardContainers"));
  if (savedContainers && savedContainers.length > 0) {
    for (var i = 0; i < savedContainers.length; i++) {
      var savedContainer = savedContainers[i];

      var containerWrapper = document.createElement("div");
      containerWrapper.innerHTML = savedContainer;
      var savedCard = containerWrapper.firstChild;

      var currentContainer = document.getElementById("bikeCardTemplate");
      currentContainer.parentNode.insertBefore(savedCard, currentContainer.nextSibling);
    }
  }
});

function resetCardValues() {
  // Reset the values to their original state
  var editableElements = document.querySelectorAll(".bike-card-title[contentEditable='true'], .bike-card-text[contentEditable='true'], .bike-card-price[contentEditable='true']");
  for (var i = 0; i < editableElements.length; i++) {
    var element = editableElements[i];
    element.innerText = originalValues[element.id];

  }
}