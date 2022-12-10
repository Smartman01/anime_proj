const express = require('express')
const router = express.Router()

const Fuse = require('fuse.js')

const Character = require('../models/character')
const Anime = require('../models/anime')

const options = { keys : [ "name" ], threshold: 0.4 };

// check character search
router.get('/searchcharacter/:name', async (req, res) =>
{
    try
    {
        const characters = await Character.find()
        const fuse = new Fuse(characters, options);
        res.json(fuse.search(req.params.name))
    }
    catch (err)
    {
        res.status(500).json({ messsage: err.messsage })
    }
})

// check character guess
router.get('/guesscharacter/:name', async (req, res) =>
{
    res.send(req.params.name)
})

// check anime search
router.get('/searchanime/:name', async (req, res) =>
{
    try
    {
        const animes = await Anime.find()
        const fuse = new Fuse(animes, options);
        res.json(fuse.search(req.params.name))
    }
    catch (err)
    {
        res.status(500).json({ messsage: err.messsage })
    }
})

// check anime guess
router.get('/guessanime/:name', async (req, res) =>
{
    res.send(req.params.name)
})

module.exports = router