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
        INSERT INTO remito(nroRemito, puntoVenta, sector, descargado)
        VALUES (?, ?, ?, ?); 
    `;
    mysqlConnection.query(query, [nroRemito, puntoVenta, sector, descargado], (err, rows, fields) =>{
        if(!err){
            res.json({Status: 'Remito guardado'})
        }else{
            console.log(err);
        }
    });

});

//Método para editar/actualizar un registro
router.put('/:nroRemito', (req, res) => {
    const { nroRemito, puntoVenta, sector, descargado } = req.body;
    const { nroRemitoOld } = req.params;
    console.log(`remito: ${nroRemito}`);
    const query = `
        UPDATE remito SET nroRemito = ${nroRemito}, puntoVenta = ${puntoVenta}, sector = ${sector}, descargado = ${descargado} WHERE nroRemito = ${nroRemitoOld};
    `;
    mysqlConnection.query(query, [], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Remito actualizado'});
      } else {
        console.log(err);
      }
    });
  });


module.exports = router;