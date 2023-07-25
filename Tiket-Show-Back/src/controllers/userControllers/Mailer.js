
const nodemailer = require("nodemailer")



async function sendEmail(subject, email,firstName, content) {
  console.log(email,"soy el email")
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: process.env.EMAIL,
          pass:process.env.PASSWORD
        },
      });
    
    
      const mailOptions = {
      from: process.env.EMAIL,
      to: email,

      subject: "Confirmacion de Registro",
       html: `<h1>Gracias por registrarte ${firstName} en TiketShow</h1>
      <p>Para confirmar tu registro haz click en el siguiente enlace</p>
      <a href="${process.env.FRONT_URL || 'http://localhost:5173/'
          }/confirm/>Confirmar registro</a>`

    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Correo electrónico enviado:', info.response);
    } catch (error) {
      console.log('Error al enviar el correo electrónico:', error);
    }
  }
  
  module.exports = { sendEmail };
