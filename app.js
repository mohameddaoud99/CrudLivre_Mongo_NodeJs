const express = require('express');
const path = require('path');
const routes = require('./routes');
const app = express();
// connexion à la base de donnée
const db = "mongodb://mongo:27017/LivreDB"
const mongoose = require('mongoose');
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connexion a la base de donnée réussie');
}).catch(err => {
    console.log('Connexion impossible a la base de donnée', err);
    process.exit();
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.set('view engine', 'ejs');

app.use('/', routes);
app.listen(3001, () => {
    console.log('Server is running at localhost:3001');
});


