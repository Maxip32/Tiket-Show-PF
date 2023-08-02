const { User } = require('../../db');

const changeStateUser = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await User.findByPk(email);

        if (!user) {
            return res.status(404).json({
                msg: 'Usuario no existe',
            });
        }

        await user.update({ state: true });

        res.status(200).json({
            msg: 'Usuario activado',
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

module.exports = changeStateUser;