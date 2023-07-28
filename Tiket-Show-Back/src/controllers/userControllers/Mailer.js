const nodemailer = require("nodemailer")

async function sendEmail(subject, recipient, content) {
    const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: process.env.EMAIL,
          pass:process.env.EMAIL_PASSWORD
        },
      });
  
    const mailOptions = {
      from: process.env.EMAIL,
      to: "sixtoledo1@gmail.com",
      subject: "Confirmacion",
      body: "Gracias por registrarse con nosotros",
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Correo electrónico enviado:', info.response);
    } catch (error) {
      console.log('Error al enviar el correo electrónico:', error);
    }
  }
  
  module.exports = { sendEmail };
