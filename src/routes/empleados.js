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
        const responsable =  await pool.query('SELECT * FROM labores inner join personaLabor on idLabor = fkLabor inner join persona on fkPersona = identificacion');
        res.render('empleados/list_labores', { labores, responsable });
        });

    router.get('/empleados/asignar_labor', isLoggedIn, async (req, res)=> {
        const labores = await pool.query('SELECT * FROM labores');
        const responsable = await pool.query('SELECT * FROM persona inner join personaCargo on fkPersona = identificacion and fkCargo=2');
        res.render('empleados/labores', { labores, responsable });  
        });
    

    router.post('/empleados/asignar_labor', isLoggedIn, async(req, res)=>{
        const { hiddenResp, hiddenLab, textobservacion } = req.body;
        const nuevaLabor = {
            fkpersona: hiddenResp,
            fkLabor: hiddenLab,
            estado: 'Pendiente',
            observacion: textobservacion
        };
        console.log(nuevaLabor);
        await pool.query('INSERT INTO personaLabor set ?', [nuevaLabor]);
        req.flash('success', ' Labor guardada con Exito!');
        res.redirect('/empleados/labores');
    });

    router.get('/empleados/completar_labor/:identificacion/:idLabor', isLoggedIn, async (req, res) =>{   
        const {identificacion, idLabor} = req.params;
        console.log(identificacion);
        console.log(idLabor);
        const r = await pool.query('select * FROM persona inner join personaLabor on persona.identificacion = personaLabor.fkPersona inner join labores on labores.idLabor = personaLabor.fkLabor  WHERE fkLabor = ? and persona.identificacion = ?', [idLabor, identificacion]);
        console.log(r);
        //req.flash('success', 'Link Removed sucessfully');
        res.render('empleados/completar_labor');
    });
    module.exports = router;