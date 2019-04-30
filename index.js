// nombre de la variable igual que el nombre del modulo
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const fetch = require('node-fetch');

// Funcion que convierte rutas relativas en absolutas con promesas.
const pathAbsolute =(route)=>{
  return new Promise(function(resolve, reject) {
    resolve(file = path.resolve(route));
  });
}

// Funcion leer archivo md
const readFile=(file)=>{
  return new Promise(function (resolve, reject) {
    fs.readFile(file,function(error,md){
      if(error){
        return reject(error);
      }
      resolve(md,file);
    });
  });
}



module.exports = () => {
  pathAbsolute,
  readFile
};
