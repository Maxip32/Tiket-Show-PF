const { Event, Artist, Genre } = require('../../db.js');
const { filterAllEvents } = require('../../handlers/filterEvents/filterAllEvents');
const { Op } = require("sequelize");

const getEvents = async (req, res = response) => {
    const filter = req.query.filter || '';
    // const options = req.query.options || '';
    try {
        const events = await filterAllEvents(filter);

        if (events.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontraron eventos',
                events,
            });
        }

        return res.status(200).json(
          
            events,
        );

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        });
    }
};

const getEvent = async (req, res = response) => {
    const { id } = req.params;
    try {
        const event = await Event.findByPk(id);

        if (!event || !event.state) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro evento con ese Id',
            });
        }

        res.status(200).json({
            ok: true,
            msg: 'Evento encontrado',
            event,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        });
    }
};


const getEventByName = async (req, res) => {
    const { name } = req.params;
    const event = await Event.findAll({
      where: {
        name: {
            [Op.iLike]: `%${name}%`,
        },
      },
    });
  
    if (event.length > 0) {
       res.status(200).json(event);
    } else {
       res.status(404).send("Evento no encontrado");
    }
}



module.exports = {
    getEvents,
    getEvent,
    getEventByName,
};