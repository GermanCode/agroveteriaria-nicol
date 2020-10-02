const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'identificacion',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, identificacion, password, done) => {
    const rows = await pool.query('SELECT * FROM persona WHERE identificacion = ?', [identificacion]);
    if (rows.length > 0) {
        const persona = rows[0];
        const validPassword = await helpers.mathPassword(password, persona.password);
        if(validPassword){
            done(null, persona, req.flash('success', 'Welcome' + persona.Identificacion));
        } else {
            done(null, false, req.flash('message', 'Incorrect Password'));
        }
    }else {
            return done(null, false, req.flash('message', 'User don´t finded'));
    }
}));

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
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO persona SET ?', [newUser]);
    newUser.identificacion = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser( async (user, done) => {
    done(null, user.Identificacion);
});

passport.deserializeUser( async (Identificacion, done) => {
    const rows = await pool.query('SELECT * FROM persona WHERE identificacion = ?', [Identificacion]);
    console.log(rows);
    done(null, rows[0]);
 });

 