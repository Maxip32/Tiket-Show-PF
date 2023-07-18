const { User } = require("../db");
const path = require("path");
const fs = require("fs");


//Cargamos usuarios de la db
const loadUsers = async () => {
  
    try {
      const users2 = await User.findAll();
      if (users2.length) {
        console.log("ya hay usuarios");
        return;
      }
  
      const users = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../database/Users.json"))
      );
      await User.bulkCreate(users);
      console.log("usuarios cargados");
    } catch (error) {
      console.log(error);
    }
};

//Cargamos los Eventos
const loadEvents = async () => {

  try {
    const events2 = await Event.findAll();
    if (events2.length) {
      console.log("ya hay eventos");
      return;
    }
    const events = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../database/Events.json"))
    );
    await Event.bulkCreate(events);
    console.log("eventos cargados");
  } catch (error) {
    console.log(error);
  }
};

module.exports={
    loadUsers,
    loadEvents,
}