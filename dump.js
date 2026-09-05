require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const allowedOrigins = [
  "https://alraheemtechnologies.online",
  "http://127.0.0.1:5500",     // optional: local testing
  "http://localhost:5500"      // optional: local testing
];
// ✅ Use a dynamic origin checker
app.use(cors({
<<<<<<< HEAD:dump.js
  // origin: [
  //   "https://alraheemtechnologies.online/",
  //   "http://127.0.0.1:5500/"
  // ]
=======
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS policy violation: Origin not allowed"));
    }
  },
  credentials: true
>>>>>>> 3fac87bd49edf76b06892625d31c4c92cc1649fc:server.js
}));

// ✅ Enable preflight for all routes
app.options("*", cors());
// app.use(cors({
//   origin: [
//     "https://alraheemtechnologies.online",
//   ]
// }));
// app.options('*', cors());
app.use(express.json());

// Create SMTP Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Your email
    pass: process.env.PASSWORD, // Your app password (not regular password)
  },
});

app.get("/", (req, res) => {
  res.json({ success: true, message: "Server is running." });
});
// Email sending endpoint
app.post("/send-email", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.TOEMAIL,
      subject: "New Quote Request",
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    });

    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Email sending failed." });
  }
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
