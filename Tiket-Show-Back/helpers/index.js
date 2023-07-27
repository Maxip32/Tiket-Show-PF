const transporter = require("./helpers/mailer")


app.post("/api/auth/login/:email/code", function (req, res) {
    const { email } = req.params
    const result = await transporter.sendMail({
     from: `Henry ${process.env.EMAIL}`,
     to: email,
     subjet: "Código de inicio de sesión: ",
     body: "Este es tu codigo para iniciar sesión: ",
    })
    res.status(200).json({ ok: true, message: "Código enviado con éxito!"})
});