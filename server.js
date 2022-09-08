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
const request = require('request');
let url = "http://nolaborables.com.ar/api/v2/feriados/2022";
let options = {json: true};
request(url, options, (error, res, body) => {
    if (error) {
        return  console.log(error)
    };
    if (!error && res.statusCode == 200) {
        //EJEMPLO SOLO PARA VER LOS FERIADOS DE MAYO
        let respuesta = "FERIADOS DE MAYO:";
        for (x of body) {
            if (x.mes=="5") {
                respuesta = respuesta + '\n' + x.motivo;
            };
        }
        return console.log(respuesta);
        //return  console.log(body);
        //return  console.log(body[11].motivo);
    };
});
