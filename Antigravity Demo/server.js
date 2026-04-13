const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// 🔥 Email transporter (Gmail example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mr.blackvision03@gmail.com",
    pass: "arya@arya24052008" // 🔴 use app password
  }
});

// 📩 Booking API
app.post("/book", async (req, res) => {
  const { name, phone, email, eventType, datetime, message } = req.body;

  try {
    // Email to YOU
    await transporter.sendMail({
      from: email,
      to: "your-email@gmail.com",
      subject: "New Booking Request",
      html: `
                <h2>New Booking</h2>
                <p><b>Name:</b> ${name}</p>
                <p><b>Phone:</b> ${phone}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Event:</b> ${eventType}</p>
                <p><b>Date:</b> ${datetime}</p>
                <p><b>Message:</b> ${message}</p>
            `
    });

    // Confirmation to CLIENT
    await transporter.sendMail({
      from: "your-email@gmail.com",
      to: email,
      subject: "Booking Confirmed 💕",
      html: `
                <h2>Thank you ${name}!</h2>
                <p>Your Mehandhi booking is received.</p>
                <p>We will contact you soon 😊</p>
            `
    });

    res.json({ success: true, message: "Booking successful!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error sending email" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
