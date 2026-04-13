document.getElementById("bookingForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        eventType: document.getElementById("eventType").value,
        datetime: document.getElementById("datetime").value,
        message: document.getElementById("message").value
    };

    const status = document.getElementById("formStatus");

    try {
        const response = await fetch("http://localhost:5000/book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.success) {
            status.innerHTML = "✅ Booking successful!";
            status.style.color = "green";
        } else {
            status.innerHTML = "❌ Failed to book.";
        }

    } catch (error) {
        status.innerHTML = "⚠️ Server error!";
    }
});
