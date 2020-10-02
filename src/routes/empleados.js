const express = require('express');
const router = express.Router();

const pool = require('../database')

const { isLoggedIn } = require('../lib/auth');

router.get('/empleados', isLoggedIn, async (req, res)=> {
    const empleados = await pool.query('SELECT * FROM persona');
    console.log(empleados);
    res.render('empleados/list_empleados', { empleados });
    });

/*router.get('/empleados',  (req, res) => {
        console.log('hola')
        res.render('empleados/list_empleados');
    });*/
    module.exports = router;