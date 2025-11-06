const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors()); // Uso de la funcion
app.use(express.json());

const db = mysql.createConnection({ //Funcion para conectar
    host: 'localhost',
    user: 'root',
    password: 'carlitos2541',
    port: 3306,
    database: 'Articulos'
});

db.connect(err => { // Controlar los errores
    if (err) {
        console.err('Error de conexion a la BD', err.stack);
        return;
    }
    console.log('Conectado a la DB: ' + db.threadId);
});

//endpoint
app.get('/OArt', (req, res) => {
    console.log('Ruta del endpoint accedida');
    db.query('SELECT * FROM Articulos', (err, result) => {
        if (err) {
            console.error(err);
            console.error('Error de base de datos', err);
            return res.status(500).json({
                err: 'Error al consultar la base de datos. Intentalo mas tarde'
            });
        }
        res.status(200).json(result);
    });
});

app.listen(3000, () => {
    console.log("Server Running")
});