const { User, Artist } = require('../../db');

const stateUser = async (req, res) => {
    const { email } = req.params;

    try {
        // Utilizar una transacción para asegurar la integridad de los datos
            const user = await User.findOne({
                where: { email }
            });

            const artist = await Artist.findOne({
                where: { email },
            });

            if (!user && !artist) {
                return res.status(404).json({
                    msg: 'Usuario o artista no existe',
                });
            }

            if (user) {
                await user.update({ state: true });
            }

            if (artist) {
                await artist.update({ state: true });
            }

        res.status(200).json({
            msg: 'Usuario o artista activado',
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

module.exports = stateUser;