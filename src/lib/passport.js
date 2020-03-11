const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');


passport.use('local.signup', new LocalStrategy({
    usernameField: 'identificacion',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, identificacion, password, done) => {
    const { nombres, apellidos, fechaNacimiento, telefono } = req.body;
    const newUser = {
        identificacion,
        nombres,
        apellidos,
        fechaNacimiento, 
        telefono,
        password
    };
    console.log('new user: ', newUser);

    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO persona SET ?', [newUser]);
    console.log(result);
   
}));

