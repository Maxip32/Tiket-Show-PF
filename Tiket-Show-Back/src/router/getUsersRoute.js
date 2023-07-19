const express = require('express')
const router = express.Router()
const { Users } = require("../db")

router.get('/', async (req, res) => {             //????
    const resultant = await Users.findAll()
    res.status(200).json(resultant)
})

module.exports = router;