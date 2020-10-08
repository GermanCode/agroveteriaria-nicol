const express = require('express');
const router = express.Router();

const pool = require('../database')

const { isLoggedIn } = require('../lib/auth');

router.get('/empleados', isLoggedIn, async (req, res)=> {
    const empleados = await pool.query('SELECT * FROM persona');
    console.log(empleados);
    res.render('empleados/list_empleados', { empleados });
    });

    router.get('/empleados/labores', isLoggedIn, async (req, res)=> {
        const labores = await pool.query('SELECT * FROM labores');
        console.log(labores);
        res.render('empleados/list_labores', { labores });
        });

    router.get('/empleados/asignar_labor', isLoggedIn, async (req, res)=> {
        const labores = await pool.query('SELECT * FROM labores');
        const responsable = await pool.query('SELECT * FROM persona inner join personaCargo on fkPersona = identificacion and fkCargo=2');
        res.render('empleados/labores', { labores, responsable });  
        });
    

    router.post('/empleados/asignar_labor', isLoggedIn, async(req, res)=>{
        res.send('ok');
    });
    module.exports = router;