const validationCreate = (req, res, next)=>{
    const {
        firstName,
        lastName,
        nickname,
        email,
        password,
        phone,
        description,
        twitter,
        instagram,
        spotify,
        image,
       
    }  = req.body;

    if(![firstName, lastName, nickname, email, 
        password, phone, description, twitter, 
        instagram, spotify, image].every(Boolean)){

        res.status(400).send("Faltan datos por ingresar")
    }else{
        next()
    }
}

module.exports = validationCreate;