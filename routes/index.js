
const express = require('express');
const router = express.Router();
const Livre = require('../livre');



router.get('/', async (req, res,) => {
    console.log("page index");
    try {
        var result = await Livre.find().exec();
        res.render('index', { result: result });
    } catch (error) {
        res.status(500).send(error);
    }
});


router.post('/modifier/:id', async (req, res) => {
    try {
        var anclivre = await Livre.findById({ _id: req.params.id }).exec();
        anclivre.numero = req.body.numero;
        console.log(anclivre.numero);
        anclivre.category = req.body.category;
        anclivre.nom = req.body.nom;
        anclivre.description = req.body.description;
        anclivre.prix = req.body.prix;

        var result = await anclivre.save();
        res.redirect('/');
    }
    catch (error) {
        res.status(400).send("impossible de modifier la base de données");
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        var result = await Livre.findById({ _id: req.params.id }).exec();
        res.render('modifier', { result: result, id: req.params.id });
    }
    catch (error) {
        res.status(500).send(error);
    }
});

router.post('/ajout', async (req, res) => {
    try {
        var livre = new Livre({
            numero: req.body.numero,
            category: req.body.category,
            nom: req.body.nom,
            description: req.body.description,
            prix: req.body.prix

        });
        var result = await livre.save();
        res.redirect('/');
    } catch (error) {
        response.status(500).send(error);
    }
});


router.get('/add', async (req, res) => {
    try {
        res.render('add');
    } catch (error) {
        res.status(500).send(error);
    }
});


// Supprimer une personne
router.get('/delete/:livreId', async (req, res) => {
    try {
        var result = await Livre.deleteOne({ _id: req.params.livreId }).exec();
        // res.send(result);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = router;