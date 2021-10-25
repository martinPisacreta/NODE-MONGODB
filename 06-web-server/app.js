require('dotenv').config();
const express = require('express')


const app = express()
const port = process.env.PORT;

//Servir contenido estatico -> middleware 
//aca sirvo el public/index.html
//dentro de public hay una app de react (osea el build de la app)
app.use(express.static('public'))



  app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html') //esto es un path absoluto
  })
 
 
  //ACA SE USA UN CALLBACK , OSEA UNA FUNCION DENTRO DE UNA FUNCION
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })