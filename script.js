// Function to reload the page
function reloadPageOnResize() {
	location.reload();
}

// Attach the event listener to the window's resize event
window.addEventListener('resize', reloadPageOnResize);


function myFunction(x) {
  x.classList.toggle("change");
}


// Function to enter fullscreen mode
function enterFullscreen() {
	// var elem = document.documentElement;
	// if (elem.requestFullscreen) {
	// 	elem.requestFullscreen();
	// } else if (elem.mozRequestFullScreen) {
	// 	elem.mozRequestFullScreen();
	// } else if (elem.webkitRequestFullscreen) {
	// 	elem.webkitRequestFullscreen();
	// } else if (elem.msRequestFullscreen) {
	// 	elem.msRequestFullscreen();
	// }

	var fullscreenModal = document.getElementById("fullscreen-modal");
	fullscreenModal.style.display = "none";
}

// Show the fullscreen modal on page load
var fullscreenModal = document.getElementById("fullscreen-modal");
window.addEventListener("load", function () {
	if (window.innerWidth > 991) {

	fullscreenModal.style.display = "block";
} else	{
		fullscreenModal.style.display = "none";

	}
});


//animation-in left or right

function toggleVisibility(elementSelector) {
	let element = document.querySelector(elementSelector);

	if (!element) {
		console.error("Element not found.");
		return;
	}

	let rect = element.getBoundingClientRect();
	let scrollTop = window.scrollY || document.documentElement.scrollTop;

	if (rect.top < window.innerHeight && rect.bottom > 0) {
		element.classList.add("visible");
		element.classList.remove("fromright");
		element.classList.remove("fromleft");
	} else {
		element.classList.remove("visible");

		if (
			!element.classList.contains("fromright") &&
			!element.classList.contains("fromleft")
		) {
			element.classList.add("fromright");
		}
	}
}

function addVisibilityListener(elementSelector) {
	let element = document.querySelector(elementSelector);

	if (!element) {
		console.error("Element not found.");
		return;
	}

	let originalClassName = element.className;

	window.addEventListener("scroll", () => {
		toggleVisibility(elementSelector);
	});

	window.addEventListener("scroll", () => {
		let rect = element.getBoundingClientRect();

		if (rect.top >= window.innerHeight || rect.bottom <= 0) {
			element.className = originalClassName;
		}
	});
}

addVisibilityListener(".section1a");
addVisibilityListener(".newsletter");

//animation-in scale or opacity

function toggleVisibility(elementSelector) {
	let element = document.querySelector(elementSelector);

	if (!element) {
		console.error("Element not found.");
		return;
	}

	let rect = element.getBoundingClientRect();
	let scrollTop = window.scrollY || document.documentElement.scrollTop;

	if (rect.top < window.innerHeight && rect.bottom > 0) {
		element.classList.add("visible");
		element.classList.remove("scaleup");
		element.classList.remove("hidden");
	} else {
		element.classList.remove("visible");

		if (
			!element.classList.contains("scaleup") &&
			!element.classList.contains("hidden")
		) {
			element.classList.add("scaleup");
		}
	}
}

function addVisibilityListener(elementSelector) {
	let element = document.querySelector(elementSelector);

	if (!element) {
		console.error("Element not found.");
		return;
	}

	let originalClassName = element.className;

	window.addEventListener("scroll", () => {
		toggleVisibility(elementSelector);
	});

	window.addEventListener("scroll", () => {
		let rect = element.getBoundingClientRect();

		if (rect.top >= window.innerHeight || rect.bottom <= 0) {
			element.className = originalClassName;
		}
	});
}

addVisibilityListener(".section2");

//navbar-toggler movable via mouse

if (window.innerWidth < 991) {
	dragElement(document.querySelector(".navbar-toggler"));

	function dragElement(elmnt) {
		let pos1 = 0,
			pos2 = 0,
			pos3 = 0,
			pos4 = 0;

		elmnt.onmousedown = dragMouseDown;

		function dragMouseDown(e) {
			e.preventDefault();
			pos3 = e.clientX;
			pos4 = e.clientY;
			document.onmouseup = closeDragElement;
			document.onmousemove = elementDrag;
		}

		function elementDrag(e) {
			e = e || window.event;
			e.preventDefault();
			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
			pos3 = e.clientX;
			pos4 = e.clientY;

			// Calculate the boundaries based on window size
			let windowWidth = window.innerWidth;
			let windowHeight = window.innerHeight;
			let togglerWidth = elmnt.offsetWidth;
			let togglerHeight = elmnt.offsetHeight;
			let maxLeft = windowWidth - togglerWidth;
			let maxTop = windowHeight - togglerHeight;

			// Restrict the horizontal movement within the window boundaries
			let newLeft = elmnt.offsetLeft - pos1;
			newLeft = Math.max(0, Math.min(newLeft, maxLeft));

			// Restrict the vertical movement within the window boundaries
			let newTop = elmnt.offsetTop - pos2;
			newTop = Math.max(0, Math.min(newTop, maxTop));

			elmnt.style.left = newLeft + "px";
			elmnt.style.top = newTop + "px";

			savePosition(elmnt);
		}

		function closeDragElement() {
			document.onmouseup = null;
			document.onmousemove = null;
		}

		function savePosition(elmnt) {
			let position = {
				top: elmnt.offsetTop,
				left: elmnt.offsetLeft,
			};
			sessionStorage.setItem("navbarTogglerPosition", JSON.stringify(position));
		}

		// Check if position data is stored in sessionStorage
		let storedPosition = sessionStorage.getItem("navbarTogglerPosition");
		if (storedPosition) {
			let position = JSON.parse(storedPosition);
			elmnt.style.top = position.top + "px";
			elmnt.style.left = position.left + "px";
		}

		//navbar draggable on y-axis via mouse
		dragElement(document.querySelector(".navbar-nav"));

		function dragElement(elmnt) {
			let pos1 = 0,
				pos2 = 0,
				pos3 = 0,
				pos4 = 0;

			elmnt.onmousedown = dragMouseDown;

			function dragMouseDown(e) {
				e.preventDefault();
				pos3 = e.clientX;
				pos4 = e.clientY;
				document.onmouseup = closeDragElement;
				document.onmousemove = elementDrag;
			}

			function elementDrag(e) {
				e = e || window.event;
				e.preventDefault();
				pos1 = pos3 - e.clientX;
				pos2 = pos4 - e.clientY;
				pos3 = e.clientX;
				pos4 = e.clientY;

				// Calculate the boundaries based on window size
				let windowHeight = window.innerHeight;
				let navbarHeight = elmnt.offsetHeight;
				let maxTop = windowHeight - navbarHeight;

				// Restrict the vertical movement within the window boundaries
				let newTop = elmnt.offsetTop - pos2;
				newTop = Math.max(0, Math.min(newTop, maxTop));

				elmnt.style.top = newTop + "px";

				function refreshOnResize() {
					location.reload();
				}

				window.addEventListener("resize", refreshOnResize);
			}

			function closeDragElement() {
				document.onmouseup = null;
				document.onmousemove = null;
			}
		}
	}
}

//navbar-toggler movable via touch

if (window.innerWidth < 991) {
	window.onload = function () {
		let navbarToggler = document.querySelector(".navbar-toggler");

		navbarToggler.addEventListener("touchmove", function (ev) {
			let touchLocation = ev.targetTouches[0];

			// Calculate the boundaries based on window size
			let windowWidth = window.innerWidth;
			let windowHeight = window.innerHeight;
			let togglerWidth = navbarToggler.offsetWidth;
			let togglerHeight = navbarToggler.offsetHeight;
			let maxLeft = windowWidth - togglerWidth;
			let maxTop = windowHeight - togglerHeight;

			// Calculate the new left and top positions, restricting them within the window boundaries
			let newLeft = Math.max(0, Math.min(touchLocation.clientX - 25, maxLeft));
			let newTop = Math.max(0, Math.min(touchLocation.clientY - 36, maxTop));

			navbarToggler.style.left = newLeft + "px";
			navbarToggler.style.top = newTop + "px";
			navbarToggler.style.opacity = "1";

			savePosition(navbarToggler);
		});

		navbarToggler.addEventListener("touchend", function (ev) {
			let x = parseInt(navbarToggler.style.left);
			let y = parseInt(navbarToggler.style.top);
			navbarToggler.style.opacity = ".7";
		});

		navbarToggler.addEventListener("touchstart", function (ev) {
			navbarToggler.style.opacity = "1";
		});

		function savePosition(element) {
			let position = {
				top: parseInt(element.style.top),
				left: parseInt(element.style.left),
			};
			sessionStorage.setItem("navbarTogglerPosition", JSON.stringify(position));
		}

		let storedTogglerPosition = sessionStorage.getItem("navbarTogglerPosition");
		if (storedTogglerPosition) {
			let position = JSON.parse(storedTogglerPosition);
			navbarToggler.style.top = position.top + "px";
			navbarToggler.style.left = position.left + "px";
		}
	};

	// Navbar movable y-axis via touch
	let navbarNav = document.querySelector(".navbar-nav");
	let initialTouchLocationY = null;
	let initialTop = null;

	// Retrieve the saved position from local storage
	let savedTop = sessionStorage.getItem("navbarTop");
	if (savedTop) {
		navbarNav.style.top = savedTop;
	}

	navbarNav.addEventListener("touchstart", function (ev) {
		let touchLocation = ev.targetTouches[0];
		initialTouchLocationY = touchLocation.clientY;
		initialTop = parseInt(navbarNav.style.top) || 0;
	});

	navbarNav.addEventListener("touchmove", function (ev) {
		if (initialTouchLocationY === null) {
			return;
		}
		let touchLocation = ev.targetTouches[0];
		let deltaY = touchLocation.clientY - initialTouchLocationY;

		function refreshOnResize() {
			location.reload();
		}

		window.addEventListener("resize", refreshOnResize);

		// Calculate the boundaries based on window size
		let windowHeight = window.innerHeight;
		let navbarHeight = navbarNav.offsetHeight;
		let maxTop = windowHeight - navbarHeight;

		// Restrict the vertical movement within the window boundaries
		let newTop = initialTop + deltaY;
		newTop = Math.max(0, Math.min(newTop, maxTop));
		navbarNav.style.top = newTop + "px";
	});

	navbarNav.addEventListener("touchend", function (ev) {
		let x = parseInt(navbarNav.style.left);
		let y = parseInt(navbarNav.style.top);
		initialTouchLocationY = null;

		// Save the position to local storage
		sessionStorage.setItem("navbarTop", navbarNav.style.top);
	});
}

//backtotop button

function checkScrollPosition() {
	let backToTopButton = document.getElementById("backToTopButton");

	if (window.scrollY > 1000) {
		backToTopButton.classList.add("show");
	} else {
		backToTopButton.classList.remove("show");
	}
}

function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
}

checkScrollPosition(); // Call checkScrollPosition initially when the page loads
window.addEventListener("scroll", checkScrollPosition); // Add an event listener for the 'scroll' event

// tabcontent

function bikeType(evt, typeName) {
	let i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(typeName).style.display = "block";
	evt.currentTarget.className += " active";
}

document.getElementById("defaultOpen").click();

//featuredbikes animation

function setupTabContent(container) {
	let { gsap, imagesLoaded } = window;

	let buttons = {
		prev: container.querySelector(".btn--left"),
		next: container.querySelector(".btn--right"),
	};
	let cardsContainerEl = container.querySelector(".cards__wrapper");
	let appBgContainerEl = container.querySelector(".app__bg");

	let cardInfosContainerEl = container.querySelector(".info__wrapper");

	let touchStartX = 0;
	let touchEndX = 0;

	buttons.next.addEventListener("click", () => swapCards("right"));
	buttons.prev.addEventListener("click", () => swapCards("left"));

	cardsContainerEl.addEventListener("touchstart", (event) => {
		touchStartX = event.touches[0].clientX;
	});

	cardsContainerEl.addEventListener("touchmove", (event) => {
		touchEndX = event.touches[0].clientX;
	});

	cardsContainerEl.addEventListener("touchend", () => {
		let swipeDistance = touchStartX - touchEndX;
		if (swipeDistance > 50) {
			swapCards("right");
		} else if (swipeDistance < -50) {
			swapCards("left");
		}
	});

	function swapCards(direction) {
		let currentCardEl = cardsContainerEl.querySelector(".current--card");
		let previousCardEl = cardsContainerEl.querySelector(".previous--card");
		let nextCardEl = cardsContainerEl.querySelector(".next--card");

		let currentBgImageEl = appBgContainerEl.querySelector(".current--image");
		let previousBgImageEl = appBgContainerEl.querySelector(".previous--image");
		let nextBgImageEl = appBgContainerEl.querySelector(".next--image");

		changeInfo(direction);
		swapCardsClass();
		removeCardEvents(currentCardEl);

		function swapCardsClass() {
			currentCardEl.classList.remove("current--card");
			previousCardEl.classList.remove("previous--card");
			nextCardEl.classList.remove("next--card");

			currentBgImageEl.classList.remove("current--image");
			previousBgImageEl.classList.remove("previous--image");
			nextBgImageEl.classList.remove("next--image");

			currentCardEl.style.zIndex = "50";
			currentBgImageEl.style.zIndex = "-2";

			if (direction === "right") {
				previousCardEl.style.zIndex = "20";
				nextCardEl.style.zIndex = "30";
				nextBgImageEl.style.zIndex = "-1";

				currentCardEl.classList.add("previous--card");
				previousCardEl.classList.add("next--card");
				nextCardEl.classList.add("current--card");

				currentBgImageEl.classList.add("previous--image");
				previousBgImageEl.classList.add("next--image");
				nextBgImageEl.classList.add("current--image");
			} else if (direction === "left") {
				previousCardEl.style.zIndex = "30";
				nextCardEl.style.zIndex = "20";
				previousBgImageEl.style.zIndex = "-1";

				currentCardEl.classList.add("next--card");
				previousCardEl.classList.add("current--card");
				nextCardEl.classList.add("previous--card");

				currentBgImageEl.classList.add("next--image");
				previousBgImageEl.classList.add("current--image");
				nextBgImageEl.classList.add("previous--image");
			}
		}
	}

	function changeInfo(direction) {
		let currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
		let previousInfoEl = cardInfosContainerEl.querySelector(".previous--info");
		let nextInfoEl = cardInfosContainerEl.querySelector(".next--info");

		gsap
			.timeline()
			.to([buttons.prev, buttons.next], {
				duration: 0.2,
				opacity: 0.5,
			})
			.to(
				currentInfoEl.querySelectorAll(".text"),
				{
					duration: 0.4,
					stagger: 0.1,
					translateY: "-120px",
					opacity: 0,
				},
				"-="
			)
			.call(() => {
				swapInfosClass(direction);
			})
			.call(() => initCardEvents())
			.fromTo(
				direction === "right"
					? nextInfoEl.querySelectorAll(".text")
					: previousInfoEl.querySelectorAll(".text"),
				{
					opacity: 0,
					translateY: "40px",
				},
				{
					duration: 0.4,
					stagger: 0.1,
					translateY: "0px",
					opacity: 1,
				}
			)
			.to([buttons.prev, buttons.next], {
				duration: 0.2,
				opacity: 1,
				pointerEvents: "all",
			});

		function swapInfosClass() {
			currentInfoEl.classList.remove("current--info");
			previousInfoEl.classList.remove("previous--info");
			nextInfoEl.classList.remove("next--info");

			if (direction === "right") {
				currentInfoEl.classList.add("previous--info");
				nextInfoEl.classList.add("current--info");
				previousInfoEl.classList.add("next--info");
			} else if (direction === "left") {
				currentInfoEl.classList.add("next--info");
				nextInfoEl.classList.add("previous--info");
				previousInfoEl.classList.add("current--info");
			}
		}
	}

	function updateCard(e) {
		let card = e.currentTarget;
		let box = card.getBoundingClientRect();
		let centerPosition = {
			x: box.left + box.width / 2,
			y: box.top + box.height / 2,
		};
		let angle = (Math.atan2(e.pageX - centerPosition.x, 0) * 35) / Math.PI;
		gsap.set(card, {
			"--current-card-rotation-offset": `${angle}deg`,
		});
		let currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
		gsap.set(currentInfoEl, {
			rotateY: `${angle}deg`,
		});
	}

	function resetCardTransforms(e) {
		let card = e.currentTarget;
		let currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
		gsap.set(card, {
			"--current-card-rotation-offset": 0,
		});
		gsap.set(currentInfoEl, {
			rotateY: 0,
		});
	}

	function initCardEvents() {
		let currentCardEl = cardsContainerEl.querySelector(".current--card");
		currentCardEl.addEventListener("pointermove", updateCard);
		currentCardEl.addEventListener("pointerout", (e) => {
			resetCardTransforms(e);
		});
	}

	initCardEvents();

	function removeCardEvents(card) {
		card.removeEventListener("pointermove", updateCard);
	}

	function init() {
		let tl = gsap.timeline();

		tl.to(cardsContainerEl.children, {
			delay: 0.15,
			duration: 0.5,
			stagger: {
				ease: "power4.inOut",
				from: "right",
				amount: 0.1,
			},
			"--card-translateY-offset": "0%",
		})
			.to(
				cardInfosContainerEl
					.querySelector(".current--info")
					.querySelectorAll(".text"),
				{
					delay: 0.5,
					duration: 0.4,
					stagger: 0.1,
					opacity: 1,
					translateY: 0,
				}
			)
			.to(
				[buttons.prev, buttons.next],
				{
					duration: 0.4,
					opacity: 1,
					pointerEvents: "all",
				},
				"-=0.4"
			);
	}

// Function to be executed when the section2 element comes into view
function onSectionInView(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // The section2 element is now in view, run the script
      waitForImages();
    }
  });
}

// Function to be executed when the section2 element goes out of view
function onSectionOutOfView(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      // The section2 element is now out of view, revert the script
      revertImages();
    }
  });
}

const options = {
  root: null, // Use the viewport as the root
  rootMargin: "0px",
  threshold: 0 // Trigger the callback as soon as the target element is partially visible
};

// Create two separate Intersection Observers
const observerInView = new IntersectionObserver(onSectionInView, options);
const observerOutOfView = new IntersectionObserver(onSectionOutOfView, options);

// Get the section2 element
const section2 = document.querySelector(".tablinks");

// Start observing the section2 element with both observers
observerInView.observe(section2);
observerOutOfView.observe(section2);

function waitForImages() {
  let images = [document.querySelectorAll("img")];
  let totalImages = images.length;
  let loadedImages = 0;
  let loaderEl = container.querySelector(".loader span");

  gsap.set(cardsContainerEl.children, {
    "--card-translateY-offset": "100vh",
  });
  gsap.set(
    cardInfosContainerEl
      .querySelector(".current--info")
      .querySelectorAll(".text"),
    {
      translateY: "40px",
      opacity: 0,
    }
  );
  gsap.set([buttons.prev, buttons.next], {
    pointerEvents: "none",
    opacity: "0",
  });

  images.forEach((image) => {
    imagesLoaded(image, (instance) => {
      if (instance.isComplete) {
        loadedImages++;
        let loadProgress = loadedImages / totalImages;

        gsap.to(loaderEl, {
          duration: 1,
          scaleX: loadProgress,
          backgroundColor: `hsl(${loadProgress * 120}, 100%, 50%)`,
        });

        if (totalImages == loadedImages) {
          gsap
            .timeline()
            .to(".loading__wrapper", {
              duration: 0.8,
              opacity: 0,
              pointerEvents: "none",
            })
            .call(() => init());
        }
      }
    });
  });
}

function revertImages() {
	translateY: "0px";

  // Code to revert the changes done in waitForImages()
  // Add code here to revert any animations or styles applied
  // when the section2 element was in view and the script ran.
  // For example, remove any classes, reset styles, etc.
  // Make sure to handle any changes you applied in waitForImages()
  // to ensure the script reverts smoothly when the element goes out of view.
}

}

let tabContent1 = document.getElementById("Cruiser");
setupTabContent(Cruiser);

let tabContent2 = document.getElementById("OffRoad");
setupTabContent(OffRoad);

let tabContent3 = document.getElementById("Sports");
setupTabContent(Sports);

let tabContent4 = document.getElementById("Touring");
setupTabContent(Touring);

let tabContent5 = document.getElementById("Scooter");
setupTabContent(Scooter);


