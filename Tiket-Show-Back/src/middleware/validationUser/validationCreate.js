module.exports = (req, res, next)=>{
    const {
        firstName,
        lastName,
        email,
        password,
        birthDate,
        phone,
        dni,
        isAdmin,
        google,
        image,
        state,
        confirmed
    }  = req.body;

    if(![ firstName,
        lastName,
        email,
        password,
        birthDate,
        phone,
        dni,
        isAdmin,
        google,
        image,
        state,
        confirmed].every(Boolean)){

        res.status(400).send("Faltan datos por ingresar")
    }else{
        next()
    }
}