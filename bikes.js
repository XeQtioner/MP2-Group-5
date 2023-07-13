// // Function to add a new card-container div
// function addCardContainer() {
//   var container = document.createElement("div");
//   container.classList.add("bike-card-container", "mt-3");

//   var logo = document.createElement("h6");
//   logo.textContent = "brand logo";

//   var card = document.createElement("div");
//   card.classList.add("bike-card");

//   var image = document.createElement("img");
//   image.classList.add("bike-card-img-top");
//   image.src = "./images/bmw2.jpg";
//   image.alt = "bike-Card image";
//   image.style.width = "100%";

//   var cardBody = document.createElement("div");
//   cardBody.classList.add("bike-card-body");

//   var title = document.createElement("h4");
//   title.classList.add("bike-card-title");
//   title.textContent = "BMW S1000 RR 2023";

//   var text = document.createElement("p");
//   text.classList.add("bike-card-text");
//   text.textContent = "6-Speed Manual";

//   var link = document.createElement("a");
//   link.classList.add("btn", "btn-dark");
//   link.href = "#";
//   link.textContent = "Book Now";

//   // Appending elements to their respective parent containers
//   cardBody.appendChild(title);
//   cardBody.appendChild(text);
//   cardBody.appendChild(link);

//   card.appendChild(image);
//   card.appendChild(cardBody);

//   container.appendChild(logo);
//   container.appendChild(card);

//   // Adding the new card-container div to the bikecontainer div
//   var bikeContainer = document.querySelector(".bikecontainer");
//   bikeContainer.appendChild(container);
// }

// Calling the addCardContainer function three times to add three initial card-container divs
// addCardContainer();
// addCardContainer();

// Retrieve input values and update the corresponding elements
function updateCard() {
  const bikelogo = document.getElementById("bikelogoInput").value;
  const bikeCardImg = document.getElementById("bikeCardImgInput").value;
  const bikeCardTitle = document.getElementById("bikeCardTitleInput").value;
  const bikeCardText = document.getElementById("bikeCardTextInput").value;
  const bikeCardPrice = document.getElementById("bikeCardPriceInput").value;

  const logoImage = document.querySelector(".bikelogo img");
  const cardImage = document.querySelector(".bike-card-img-top");
  const cardTitle = document.querySelector(".bike-card-title");
  const cardText = document.querySelector(".bike-card-text");
  const cardPrice = document.querySelector(".bike-card-price");

  logoImage.src = bikelogo;
  cardImage.src = bikeCardImg;
  cardTitle.textContent = bikeCardTitle;
  cardText.textContent = bikeCardText;
  cardPrice.textContent = bikeCardPrice;
}

// Example usage: Call updateCard() function whenever the input values change
document.getElementById("bikelogoInput").addEventListener("input", updateCard);
document.getElementById("bikeCardImgInput").addEventListener("input", updateCard);
document.getElementById("bikeCardTitleInput").addEventListener("input", updateCard);
document.getElementById("bikeCardTextInput").addEventListener("input", updateCard);
document.getElementById("bikeCardPriceInput").addEventListener("input", updateCard);


