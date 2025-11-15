document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);

  const name = params.get("name");
  const image = params.get("image");
  const description = params.get("description");
  const specs = params.get("specs");
  const price = params.get("price");

  // Update room summary section
  const roomDetail = document.querySelector(".room__request .room__detail");
  if (roomDetail) {
    const title = roomDetail.querySelector("h2");
    const desc = roomDetail.querySelector("p");
    const specsSpan = roomDetail.querySelector(".room__detail__booking span");
    const priceTag = roomDetail.querySelector(
      ".room__detail__booking__price p"
    );

    if (title) title.textContent = name;
    if (desc) desc.textContent = description;
    if (specsSpan) specsSpan.textContent = specs;
    if (priceTag) priceTag.textContent = price;
  }

  const roomImage = document.querySelector(".room__request .room__image img");
  if (roomImage) {
    roomImage.src = image;
    roomImage.alt = `Image ${name}`;
  }

  // Update payment summary section
  const paymentImage = document.querySelector(".payment__image img");
  if (paymentImage) {
    paymentImage.src = image;
    paymentImage.alt = `Image ${name}`;
  }

  const paymentDetails = document.querySelectorAll(".payment__detail");
  paymentDetails.forEach((detail) => {
    if (
      detail.textContent.includes("Deluxe Room") ||
      detail.textContent.includes("Suite")
    ) {
      detail.textContent = name;
    }
  });
});

const phaseItems = document.querySelectorAll(".phase ul li");

if (phaseItems.length > 0) {
  phaseItems[0].addEventListener("click", function () {
    window.location.href = "./reservation-page-1.html";
  });

  if (phaseItems.length > 2) {
    phaseItems[2].addEventListener("click", function () {
      window.location.href = "./reservation-page-2.html";
    });
  }
  const paymentButton = document.querySelector(".payment__button");
  if (paymentButton) {
    paymentButton.addEventListener("click", () => {
      window.location.href = "./reservation-page-4/index.html";
    });
  }
}
