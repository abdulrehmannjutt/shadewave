const nodemailer = require("nodemailer");

require("dotenv").config();

const sendEmail = async (req, res) => {
  const { name, email, message, phone } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "Please fill in all required fields." });
  }

  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "9497699@gmail.com",
        pass: "wmrmtuvdpvyozduf",
      },
    });

    // Email content
    const mailOptions = {
      from: email,
      to: "9497699@gmail.com",
      subject: `Contact Us Form: Message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone ? `${phone}` : "Not Provided"}
        Message: ${message}
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send the message." });
  }
};

module.exports = { sendEmail };
