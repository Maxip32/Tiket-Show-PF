const nodemailer = require("nodemailer");

async function sendEmail(subject, email, content) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,

      subject: "Confirmacion de Registro",
      html: `<h1>Gracias por registrarte  en TiketShow</h1>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Correo electrónico enviado:", info.response);
  } catch (error) {
    console.log("Error al enviar el correo electrónico:", error);
  }
}

module.exports = { sendEmail };
