const express = require('express')
const router = express.Router()

const Fuse = require('fuse.js')

const Character = require('../models/character')
const Anime = require('../models/anime')
const DayIndex = require('../models/dayindex')

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
router.get('/guesscharacter/:name/:numTries', async (req, res) =>
{
    try
    {
        const dayindex = await DayIndex.find()
        const character = await Character.find()

        const isCorrect = req.params.name === character[dayindex[0].index_character].name;

        console.log(req.params.numTries)
        console.log(isCorrect || parseInt(req.params.numTries) === 4)

        res.json({
            guessCorrect: isCorrect,
            failed: req.params.numTries === 4,
            character: isCorrect || req.params.numTries === 4 ? character[dayindex[0].index_character] : null
        })
    }
    catch (err)
    {
        res.status(500).json({ messsage: err.messsage })
    }
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
    try
    {
        const dayindex = await DayIndex.find()
        const anime = await Anime.find()

        res.json({ guessCorrect: req.params.name === anime[dayindex[0].index_anime].name })
    }
    catch (err)
    {
        res.status(500).json({ messsage: err.messsage })
    }
})

router.get('/oftheday/:category', async (req, res) =>
{
    try
    {
        const dayindex = await DayIndex.find()

        if (req.params.category === "anime")
        {
            const anime = await Anime.find()
            
            res.json({ characteristics: anime[dayindex[0].index_anime].characteristics })
        }
        else
        {
            const character = await Character.find()
            
            res.json({ characteristics: character[[dayindex[0].index_character]].characteristics })
        }
    }
    catch (err)
    {
        res.status(500).json({ messsage: err.messsage })
    }
})

module.exports = router