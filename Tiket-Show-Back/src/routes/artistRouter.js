const express = require('express')
const router = express.Router()
const { Artist } = require("../db")

router.get('/', async (req, res) => {
    const resultant = await Artist.findAll()
    res.status(200).json(resultant)
})

module.exports = router;