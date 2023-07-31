
const nodemailer = require("nodemailer")



async function sendEmail(subject, email,firstName, content) {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: process.env.EMAIL,
          pass:process.env.PASSWORD
        },
        tls: {
          rejectUnauthorized: false // Esto desactiva la verificación del certificado
        }
      });
    
    
      const mailOptions = {
      from: process.env.EMAIL,
      to: email,

      subject: "Confirmación de Registro",
      html: `<h1>Gracias por registrarte ${firstName} en TicketShow</h1>`
    

    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Correo electrónico enviado:', info.response);
    } catch (error) {
      console.log('Error al enviar el correo electrónico:', error);
    }
  }
  
  module.exports = { sendEmail };