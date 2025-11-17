const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
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

//endpoint de artículos (existente)
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

// --- NUEVO ENDPOINT PARA LOGIN ---
app.post('/login', (req, res) => {
    const { correo, contrasena } = req.body; // Recibimos correo y contraseña

    if (!correo || !contrasena) {
        return res.status(400).json({
            error: 'Correo y contraseña son requeridos.'
        });
    }

    const query = 'SELECT * FROM Clientes WHERE Correo = ? AND Contraseña = ?';

    db.query(query, [correo, contrasena], (err, result) => {
        if (err) {
            console.error('Error de base de datos', err);
            return res.status(500).json({
                error: 'Error al consultar la base de datos.'
            });
        }

        if (result.length > 0) {
            // ¡Usuario encontrado!
            // No enviamos la contraseña de vuelta al frontend por seguridad
            const usuario = {
                idCliente: result[0].idCliente,
                Nombre: result[0].Nombre,
                Correo: result[0].Correo,
                Rol: result[0].Rol
            };
            res.status(200).json(usuario);
        } else {
            // Usuario no encontrado o contraseña incorrecta
            res.status(401).json({
                error: 'Correo o contraseña incorrectos.'
            });
        }
    });
});

app.listen(3000, () => {
    console.log("Server Running")
});