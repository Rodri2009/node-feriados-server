/* EJEMPLO DEL JSON DEVUELTO POR LA API
http://nolaborables.com.ar/api/v2/feriados/2022

[
  {
    motivo: 'Año Nuevo',
    tipo: 'inamovible',
    info: 'https://es.wikipedia.org/wiki/A%C3%B1o_Nuevo',
    dia: 1,
    mes: 1,
    id: 'año-nuevo'
  },
  {
    motivo: 'Navidad',
    tipo: 'inamovible',
    info: 'https://es.wikipedia.org/wiki/Navidad',
    dia: 25,
    mes: 12,
    id: 'navidad'
  }
]
*/


//CREAR EL SERVER
const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//RUTA INICIAL
app.get('/', async function(req, res) {
  let page = req.query.page;
  let limit = req.query.limit;
  let itemArray = {}, itemObject = [];
  itemArray.status = "200";
  itemArray.server = "SERVER ON";
  itemArray.mensaje = "Vienvenido al Templo de Claypole - Server 1.0";
  itemObject.push(itemArray);
  res.json(itemArray);
});

//RUTA CON PARAMETROS GET
//EJEMPLO:
//        http://localhost:8080/ano/mes
//        http://localhost:8080/2018/2
app.get('/:ano/:mes', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  //res.setHeader('X-Foo', 'bar')
  //res.setHeader('Content-Type', 'text/plain');
  let ano = Number(req.params.ano);
  let mes = Number(req.params.mes);
  getFeriados(ano,mes,function(err, data){
    if(!err){
      res.send(data);
    }else{
      res.send(err);
    }
  });
})

//OTRAS RUTAS
/*app.get('/api/products', (req, res) => {
  const partial_products = products.map(product => {
      return { id: product.id, name: product.name }
  })
  res.json(partial_products)
})
app.get('/api/products/:productID', (req, res) => {
  const id = Number(req.params.productID)
  const product = products.find(product => product.id === id)
  res.json(product)
})*/

let server = app.listen(8080, function() {
  console.log('Server ON - PORT 8080')
});

function getFeriados(ano,mes,callback){
  let request = require('request');
  let url = "http://nolaborables.com.ar/api/v2/feriados/"+ano;
  let options = {json: true};
  let resArray = {}, itemObject = [];
  request(url, options, (error, res, body) => {
    if (!error && res.statusCode == 200) {
      for (x of body) {
        if (x.mes==mes) {
          resArray.dia = x.dia;
          resArray.motivo = x.motivo;
          itemObject.push(resArray);
        };
      }
      //result = JSON.stringify(JSON.parse(body));
      console.log(resArray);
      return callback(null, resArray);      
    } else {
      resArray.error1 = error;
      resArray.error2 = body;
      itemObject.push(resArray);
      console.log(resArray);
      return callback(resArray, null);
    }
  });
}