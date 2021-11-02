const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/', (req,res)=> {
    mysqlConnection.query('SELECT * FROM remito', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
})

router.get('/:nroRemito', (req, res) => {
    const { nroRemito } = req.params;
    mysqlConnection.query('SELECT * FROM remito WHERE nroRemito = ?', [nroRemito], (err, rows, fields) => {
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

//router.post()

module.exports = router;