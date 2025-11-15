document.addEventListener("DOMContentLoaded", function () {
  const roomButtons = document.querySelectorAll(".room__detail__booking__price button");

  roomButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const roomElement = this.closest(".room");
      const roomName = roomElement.querySelector("h2").textContent.trim();
      const roomImage = roomElement.querySelector("img").getAttribute("src");
      const roomDescription = roomElement.querySelector("p").textContent.trim();
      const roomSpecs = roomElement.querySelector(".room__detail__booking span").textContent.trim();
      const roomPrice = roomElement.querySelector(".room__detail__booking__price p").textContent.trim();

      const params = new URLSearchParams({
        name: roomName,
        image: roomImage,
        description: roomDescription,
        specs: roomSpecs,
        price: roomPrice,
      });

      window.location.href = `./reservation-page-3.html?${params.toString()}`;
    });
  });
});