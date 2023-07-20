const { Event, Artist, Genre } = require('../db');

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

        return res.status(200).json({
            ok: true,
            msg: 'Eventos encontrados',
            events,
        });

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


module.exports = {
    getEvents,
    getEvent,
};