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

//Método para obtener un registro
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

//Método para crear un registro
router.post('/', (req, res) => {
    const {nroRemito, puntoVenta, sector, descargado} = req.body;
    const query = `
        SET @nroRemito = ?;
        SET @puntoVenta = ?;
        SET @sector = ?;
        SET @descargado = ?;
        CALL remitosAgregarEditar(@nroRemito, @puntoVenta, @sector, @descargado);
    `;
    mysqlConnection.query(query, [nroRemito, puntoVenta, sector, descargado], (err, rows, fields) =>{
        if(!err){
            res.json({Status: 'Remito guardado'})
        }else{
            console.log(err);
        }
    });

});

//Método para editar un registro
router.put('/:nroremito', (req, res) => {
    const { puntoVenta, sector, descargado } = req.body;
    const { nroremito } = req.params;
    const query = `
    SET @nroRemito = ?;
    SET @puntoVenta = ?;
    SET @sector = ?;
    SET @descargado = ?;
    CALL remitosAgregarEditar(@nroRemito, @puntoVenta, @sector, @descargado);
    `;
    mysqlConnection.query(query, [nroRemito, puntoVenta, sector, descargado], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Remito actualizado'});
      } else {
        console.log(err);
      }
    });
  });


module.exports = router;