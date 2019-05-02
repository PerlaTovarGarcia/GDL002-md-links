const fs = require('fs');
const path = require('path');// nombre de la variable igual que el nombre del modulo
const marked = require('marked');
const fetch = require('node-fetch');

// Funcion que convierte rutas relativas en absolutas
const pathAbsolute=(route)=> {
  return new Promise(function(resolve, reject) {
    resolve(fileName = path.resolve(route));
  });
}

// Funcion leer archivo md
const readFile=(fileName)=> {
  return new Promise(function(resolve, reject) {
    fs.readFile(fileName, function(err, md) {
      if (err) {
        return reject(err);
      }
      resolve(md, fileName);
    });
  });
}

const convertMd=(md, fileName)=> {
  //console.log(fileName)
  return new Promise(function(resolve, reject) {
    const arregloLinks = [];
    marked(md.toString(), {// Se covierte el archivo md a htm
      renderer: getLink(arregloLinks, fileName) // Se invoca la función que obtiene los links del archivo md
    });
    resolve(arregloLinks);
  });
}

const getLink = (arregloLinks, fileName)=> {
  let obj = {};
  let render = new marked.Renderer();
  render.link = function(href, title, text) {
    obj = {
      links: href,
      text: text,
      route: fileName
    };
    arregloLinks.push(obj);
    return obj;
  };
  return render;
};

const newUrl=(array)=> {
  let mypromesas = [];
  array.forEach(function(element, index) {
    mypromesas.push(new Promise((resolve, reject) => {
      fetch(element.links).then(res => {
        element.status = res.status;
        element.statusText = res.statusText;
        resolve(element);
      }).catch(err => {
        element.status = err.code;
        element.statusText = "fail";
        resolve(element);
      });
    }));
  });

  Promise.all(mypromesas).then(values => {
   console.log(values);
  }).catch(reason => {
    console.log(reason);
  });

};

pathAbsolute('./README.md')
  .then(route => readFile(fileName))
  .then(md => convertMd(md, fileName))
  .then(arregloLinks => newUrl(arregloLinks))
  .catch(err => {
    console.log('Ocurrio un error', err);
  });


module.exports = {
  pathAbsolute,
  readFile,
  convertMd,
  newUrl
};
