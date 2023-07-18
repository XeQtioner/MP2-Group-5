    // Variables for dragging
    var dragStartX;
    var dragStartY;
    var dragOffsetX;
    var dragOffsetY;
    var isDragging = false;


    // Function to prompt for image URL or select a file
    function promptForImage() {
      if (isDragging) {
        return;
      }

      var imageUrl = prompt("Please provide the image URL:");
      if (imageUrl !== null && imageUrl.trim() !== "") {
        var img = new Image();
        img.onload = function() {
          displayImage(img);
        };
        img.onerror = function() {
          alert("Failed to load image from URL.");
        };
        img.src = imageUrl;
      } else {
        var fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.addEventListener("change", handleFileSelection);
        fileInput.click();
      }
    }

    // Function to handle file drop
    function handleDrop(e) {
      e.preventDefault();
      var file = e.dataTransfer.files[0];
      if (file.type.match("image.*")) {
        readAndDisplayImage(file);
      } else {
        alert("Please drop an image file.");
      }
    }

    // Function to handle drag over
    function handleDragOver(e) {
      e.preventDefault();
    }

    // Add event listeners for drag and drop
    var dropBox = document.getElementById("dropBox");
    dropBox.addEventListener("drop", handleDrop, false);
    dropBox.addEventListener("dragover", handleDragOver, false);

    // Function to handle file selection
    function handleFileSelection(e) {
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

    // Function to read and display the image
    function readAndDisplayImage(file) {
      var reader = new FileReader();
      reader.onload = function(event) {
        var dropBox = document.getElementById("dropBox");
        dropBox.innerHTML = "";
        var img = new Image();
        img.onload = function() {
          displayImage(img);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }

    // Function to display the image
    function displayImage(img) {
      var dropBox = document.getElementById("dropBox");
      dropBox.innerHTML = "";
      dropBox.appendChild(img);
      dropBox.removeAttribute('onclick');

      // Add event listeners for dragging the image
      img.addEventListener("mousedown", startDragging);
      img.addEventListener("touchstart", startDragging);
      img.addEventListener("mouseup", stopDragging);
      img.addEventListener("touchend", stopDragging);
      img.addEventListener("mousemove", dragImage);
      img.addEventListener("touchmove", dragImage);
    }

    // Function to start dragging the image
    function startDragging(e) {
      e.preventDefault();
      isDragging = true;

      if (e.type === "mousedown") {
        dragStartX = e.clientX;
        dragStartY = e.clientY;
      } else if (e.type === "touchstart") {
        if (e.touches.length === 2) {
          touchStartDistance = getDistance(e.touches[0], e.touches[1]);
          startScale = getCurrentScale();
        } else {
          dragStartX = e.touches[0].clientX;
          dragStartY = e.touches[0].clientY;
        }
      }

      var dropBox = document.getElementById("dropBox");
      var img = dropBox.querySelector("img");
      var imgRect = img.getBoundingClientRect();
      dragOffsetX = dragStartX - imgRect.left;
      dragOffsetY = dragStartY - imgRect.top;
    }

    // Function to stop dragging the image
    function stopDragging() {
      isDragging = false;
      touchStartDistance = 0;
    }

    // Function to drag the image
    function dragImage(e) {
      if (!isDragging) {
        return;
      }

      e.preventDefault();

      var dropBox = document.getElementById("dropBox");
      var img = dropBox.querySelector("img");

      if (e.type === "mousemove") {
        img.style.left = e.clientX - dragOffsetX + "px";
        img.style.top = e.clientY - dragOffsetY + "px";
      } else {
          img.style.left = e.touches[0].clientX - dragOffsetX + "px";
          img.style.top = e.touches[0].clientY - dragOffsetY + "px";
        }
      }
    

    // Function to zoom in the image
    function zoomIn() {
      var dropBox = document.getElementById("dropBox");
      var img = dropBox.querySelector("img");
      var aspectRatio = img.naturalWidth / img.naturalHeight;
      var currWidth = img.clientWidth;
      var newWidth = currWidth + 10;
      var newHeight = newWidth / aspectRatio;
      img.style.width = newWidth + "px";
      img.style.height = newHeight + "px";
    }

    // Function to zoom out the image
    function zoomOut() {
      var dropBox = document.getElementById("dropBox");
      var img = dropBox.querySelector("img");
      var aspectRatio = img.naturalWidth / img.naturalHeight;
      var currWidth = img.clientWidth;
      var newWidth = currWidth - 10;
      var newHeight = newWidth / aspectRatio;
      img.style.width = newWidth + "px";
      img.style.height = newHeight + "px";
    }

