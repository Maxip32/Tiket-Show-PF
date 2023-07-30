const { Event, Artist, Genre } = require('../../db.js');
const { filterAllEvents } = require('../../handlers/filterEvents/filterAllEvents');
const { Op } = require("sequelize");

const getEvents = async (req, res = response) => {
    const filter = req.query.filter || '';
    // const options = req.query.options git co|| '';
    try {
        const events = await filterAllEvents(filter);

        if (events.length === 0) {
            return res.status(404).json({
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
                msg: 'No se encontro evento con ese Id',
            });
        }

        res.status(200).json({
            msg: 'Evento encontrado',
            event, 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
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

const createEvent = async (req, res = response) => {
    const {
        name,
        description,
        date,
        start,
        end,
        price,
        quotas,
        artistName,
        genres,
        image,
        city,
        address,
    } = req.body;

    try {
        let eventExis = await Event.findOne({
            where: { name, state: true },
        });

        if (eventExis) {
            return res.status(400).json({
                msg: 'El evento ya existe con ese nombre',
            });
        }

        const artist = await Artist.findOne({
            where: { nickname: artistName },
        });

        const genresDb = await Genre.findAll({
            where: { name: genres.map((g) => g) },
        });

        if (genresDb === null || genresDb.length === 0) {
            return res.status(400).json({
                msg: 'El genero no existe',
            });
        }

        if (!artist) {
            return res.status(404).json({
                msg: 'No se encontro artista con ese nombre',
            });
        }

        const event = await Event.create({
            name,
            description,
            date,
            start,
            end,
            price,
            quotas,
            image,
            address,
            city,
        });
        await event.addArtist(artist);
        await event.addGenres(genresDb);

        res.status(201).json({
            msg: 'Evento creado',
            event,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Por favor hable con el administrador',
        });
    }
};



module.exports = {
    getEvents,
    getEvent,
    getEventByName,
    createEvent
};