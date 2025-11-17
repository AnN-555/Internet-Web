document.addEventListener("DOMContentLoaded", function () {
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

    }


    const location = localStorage.getItem("selectedLocation") || "Thu Duc Ward, Ho Chi Minh City, Vietnam";
    const checkinRaw = localStorage.getItem("checkinDate") || "2025-09-26";
    const checkoutRaw = localStorage.getItem("checkoutDate") || "2025-09-27";
    const checkinDate = new Date(checkinRaw + "T00:00:00");
    const checkoutDate = new Date(checkoutRaw + "T00:00:00");
    const formatDate = (date) => date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    const nights = Math.round((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
    const datesText = `${formatDate(checkinDate)} - ${formatDate(checkoutDate)} (${nights} Night${nights > 1 ? 's' : ''})`;
    const roomImage = localStorage.getItem("stay_roomImage") || "../../images/reservation/reservation-page-4/deluxe-room.jpg";
    const roomName = localStorage.getItem("stay_roomName") || "Deluxe Room";
    const guests = localStorage.getItem("stay_guests") || "1 Room - 2 Guests";
    const basePrice = localStorage.getItem("stay_basePrice") || "5,000,000 VND";
    const tax = localStorage.getItem("stay_tax") || "500,000 VND";
    const serviceFee = localStorage.getItem("stay_serviceFee") || "250,000 VND";
    const total = localStorage.getItem("stay_total") || "5,750,000 VND";

    if (details[0]) details[0].innerHTML = `<img src="../../images/reservation/reservation-page-4/location.png" alt="" style="height: 20px"> ${location}`;
    if (details[1]) details[1].innerHTML = `<img src="../../images/reservation/reservation-page-4/calender.png" alt="" style="height: 20px"> ${dates}`;
    if (details[2]) details[2].innerHTML = `<img src="../../images/reservation/reservation-page-4/room.png" alt="" style="height: 20px"> ${roomName}`;
    if (details[3]) details[3].innerHTML = `<img src="../../images/reservation/reservation-page-4/people.png" alt="" style="height: 20px"> ${guests}`;

    const img = document.querySelector(".stay-box-image img");
    if (img) { img.src = roomImage; img.alt = roomName; }

    const spans = document.querySelectorAll(".stay_box span");
    if (spans[0]) spans[0].textContent = `exc. taxes & fees ${basePrice}`;
    if (spans[1]) spans[1].innerHTML = `Taxes & fees<br><small>VAT 10%: ${tax} | Service 5%: ${serviceFee}</small>`;
    if (spans[2]) spans[2].textContent = `Total cost ${total}`;

    const form = document.querySelector("form");
    const continueBtn = document.querySelector(".continue-btn");
    if (!form || !continueBtn) return;

    const errorDiv = document.createElement("div");
    errorDiv.style.color = "red";
    errorDiv.style.fontSize = "0.9rem";
    errorDiv.style.marginTop = "0.5rem";
    errorDiv.style.textAlign = "center";
    continueBtn.parentNode.insertBefore(errorDiv, continueBtn.nextSibling);

    continueBtn.addEventListener("click", function (e) {
        e.preventDefault();
        errorDiv.textContent = "";

        let errors = [];

        const titleChecked = document.querySelector('input[name="title"]:checked');
        if (!titleChecked) errors.push("Vui lòng chọn Title (Mr / Ms / Mrs)");


        const firstName = document.querySelector('input[placeholder="First name"]') || document.querySelectorAll(".input-group input[type=text]")[0];
        const lastName = document.querySelector('input[placeholder="Last name"]') || document.querySelectorAll(".input-group input[type=text]")[1];
        if (!firstName?.value.trim()) errors.push("Vui lòng nhập First name");
        if (!lastName?.value.trim()) errors.push("Vui lòng nhập Last name");
        const phone = document.querySelector('input[type="text"][placeholder="Phone number"]')
            || document.querySelectorAll('input[type=text]')[3];
        if (!phone?.value.trim()) errors.push("Vui lòng nhập Phone number");
        else if (!/^\d{8,12}$/.test(phone.value.trim())) errors.push("Số điện thoại phải từ 8 đến 12 số và không chứa ký tự khác");

        const email = document.querySelector('input[type="text"][placeholder="Email"]') || document.querySelector('input[type=text]:nth-of-type(3)');
        if (!email?.value.trim()) errors.push("Vui lòng nhập Email");
        else if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) errors.push("Email không hợp lệ");


        const countrySelect = document.querySelector(".input-group select");
        const country = countrySelect ? countrySelect.value : "Vietnam";
        const checkbox1 = document.querySelectorAll(".checkbox-group input[type=checkbox]")[0];
        const checkbox2 = document.querySelectorAll(".checkbox-group input[type=checkbox]")[1];
        if (!checkbox1?.checked) errors.push("Bạn phải xác nhận sẽ mang theo giấy tờ tùy thân hợp lệ");
        if (!checkbox2?.checked) errors.push("Bạn phải đồng ý với Terms & Conditions");


        if (errors.length > 0) {
            errorDiv.innerHTML = errors.join("<br>");
            errorDiv.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
            localStorage.setItem("user_title", titleChecked.value);
            localStorage.setItem("user_firstName", firstName.value.trim());
            localStorage.setItem("user_lastName", lastName.value.trim());
            localStorage.setItem("user_phone", phone.value.trim());
            localStorage.setItem("user_email", email.value.trim());
            localStorage.setItem("user_country", country);
            window.location.href = "../reservation-page-5/index.html";
        }
    });

    function highlightError(input) {
        if (input) input.style.borderBottom = "2px solid red";
    }
    function clearHighlight(input) {
        if (input) input.style.borderBottom = "";
    }
    document.querySelectorAll("input, select").forEach(field => {
        field.addEventListener("focus", () => clearHighlight(field));
    });
});
