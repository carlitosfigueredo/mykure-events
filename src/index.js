const exp = require('constants');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const { use } = require('passport');
const path = require('path');


//Configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutPath: path.join(app.get('views'), 'layouts'),
    partialDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');
//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json);

//Globales
app.use((req, res, next) => {
    next();
});

//Rutas
app.use(require('./routes/index'));
app.use(require('./routes/autentication'));
app.use('/links', require('./routes/links'));

//Publico
app.use(express.static(path.join(__dirname, 'public')))

//Run Server
app.listen(app.get('port'), () => {
    console.log('El servidor esta corriendo en http://localhost:4000/');
});