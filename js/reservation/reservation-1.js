function openPopup(popupId) {
  const popup = document.getElementById(popupId);
  const anchor = document.querySelector(".info__detail");

  if (popup && anchor) {
    const rect = anchor.getBoundingClientRect();

    popup.style.position = "absolute";
    popup.style.top = `${rect.top + window.scrollY}px`;
    popup.style.left = `${rect.left + window.scrollX}px`;
    popup.style.width = `${rect.width}px`;
    popup.style.display = "flex";
  }
}

function closePopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.style.display = "none";
  }
}

function formatDateForDisplay(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("vi-VN", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function handleDateChange(event, label) {
  const selectedDate = event.target.value;

  if (label === "Check-in") {
    document.getElementById("checkin-input").value = selectedDate;
    document
      .querySelector('[data-label="Check-in"] .button__info')
      ?.insertAdjacentHTML(
        "beforeend",
        `<span class="selected-date">${formatDateForDisplay(
          selectedDate
        )}</span>`
      );
    localStorage.setItem("checkinDate", selectedDate);
    closePopup("checkin-popup");
  } else if (label === "Check-out") {
    document.getElementById("checkout-input").value = selectedDate;
    document
      .querySelector('[data-label="Check-out"] .button__info')
      ?.insertAdjacentHTML(
        "beforeend",
        `<span class="selected-date">${formatDateForDisplay(
          selectedDate
        )}</span>`
      );

    localStorage.setItem("checkoutDate", selectedDate);
    closePopup("checkout-popup");
  }

  checkFormCompletion();
}

function toggleLocationPopup() {
  const popup = document.getElementById("location-popup");
  const container = document.querySelector(".location-container");
  const isVisible = popup.style.display === "block";
  popup.style.display = isVisible ? "none" : "block";
  container.classList.toggle("active", !isVisible);
}

function selectLocation(location) {
  document.querySelector(".step__highlight").textContent = location;
  document.getElementById("location-input").value = location;
  localStorage.setItem("selectedLocation", location);
  toggleLocationPopup();
  checkFormCompletion();
}

function openRoomPopup() {
  const popup = document.getElementById("room-popup");
  const anchor = document.querySelector(".info__detail");
  if (popup && anchor) {
    const rect = anchor.getBoundingClientRect();
    popup.style.position = "absolute";
    popup.style.top = `${rect.top + window.scrollY}px`;
    popup.style.left = `${rect.left + window.scrollX}px`;
    popup.style.width = `${rect.width}px`;
    popup.style.display = "flex";
  }
}

function closeRoomPopup() {
  const popup = document.getElementById("room-popup");
  if (popup) popup.style.display = "none";
}

function toggleRoomPopup() {
  const popup = document.getElementById("room-popup");
  const isVisible = popup.style.display === "flex";
  if (isVisible) {
    closeRoomPopup();
  } else {
    openRoomPopup();
  }
}

let adults = 0;
let children = 0;

function updateGuestCount(type, change) {
  if (type === "adults") {
    adults = Math.max(0, adults + change);
    document.getElementById("adult-count").textContent = adults;
  } else if (type === "children") {
    children = Math.max(0, children + change);
    document.getElementById("children-count").textContent = children;
  }
}

function confirmGuestSelection() {
  const info = document.querySelector(".room__selection .button__info");
  info.innerHTML = `
    <div class="amount"><p>Adults</p><p>${adults}</p></div>
    <div class="amount"><p>Children</p><p>${children}</p></div>
  `;
  document.getElementById("guests-input").value = adults + children;
  localStorage.setItem("adults", adults);
  localStorage.setItem("children", children);
  localStorage.setItem("totalGuests", adults + children);

  const popup = document.getElementById("room-popup");
  if (popup) popup.style.display = "none";
  checkFormCompletion();
}

function checkFormCompletion() {
  const location = document.getElementById("location-input").value.trim();
  const checkin = document.getElementById("checkin-input").value.trim();
  const checkout = document.getElementById("checkout-input").value.trim();
  const guests = document.getElementById("guests-input").value.trim();

  const isComplete = location && checkin && checkout && guests;
  document.getElementById("confirm-btn").disabled = !isComplete;
}

["location-input", "checkin-input", "checkout-input", "guests-input"].forEach(
  (id) => {
    document.getElementById(id).addEventListener("input", checkFormCompletion);
  }
);

document.addEventListener("DOMContentLoaded", function () {
  const confirmBtn = document.getElementById("confirm-btn");

  confirmBtn.addEventListener("click", function () {
    if (!confirmBtn.disabled) {
      window.location.href = "./reservation-page-2.html";
    }
  });

  if (localStorage.getItem("checkinDate")) {
    document.getElementById("checkin-input").value =
      localStorage.getItem("checkinDate");
  }
  if (localStorage.getItem("checkoutDate")) {
    document.getElementById("checkout-input").value =
      localStorage.getItem("checkoutDate");
  }
  const navTop = document.getElementById("top-page");
  if (navTop) {
    navTop.addEventListener("click", function () {
      window.location.href = "../index.html";
    });
  }
});
