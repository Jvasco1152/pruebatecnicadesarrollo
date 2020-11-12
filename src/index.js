const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
require('../src/database')

app.set('port', process.env.PORT || 4000);

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(express.json());

app.use(cors({origin: '*'}));


app.use('/', require('./routes/administrador.route'))
app.use('/', require('./routes/registro.route'))

app.listen(app.get('port'), ()=>{
    console.log('Escuchando por el puerto', app.get('port'));
})