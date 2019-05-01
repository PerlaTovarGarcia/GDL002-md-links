// nombre de la variable igual que el nombre del modulo
const fs = require('fs');//modulo de node para los archivos
const path = require('path');//Modulo node para checar las rutas.
const marked = require('marked');//libreria
const fetch = require('node-fetch');// Requerir fetch para peticiones a urls

// se hace una funcion para buscar la puta del link
const pathLink =(file)=>{
  return new Promise(function(resolve, reject) {
    //Si la ruta es absoluta
    if (path.isAbsolute(file)) {
      reject('No tienes ruta absoluta');
    }
    let pathAbsolute = path.resolve(file);
    //console.log(rutaAbsoluta);
    return resolve(rutaAbsoluta);
  });
};

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
};

//funcion para convertir los md con marked.
const convertMd=(md,file)=>{
    console.log(file);
    return new Promise (function(resolve, reject){
      //hago mi arrego vacio
      const links = [];
      // Se covierte el archivo md a html
      marked(md.toString(), {
      // Se invoca la función que obtiene los links del archivo md
        renderer:getLink(links, file)
      });
      resolve(links);
    })
};
//funcion  renderer de los links en marked
let getLink = (links, file)=> {
  //objeto vacio
  let obj = {};
  //variable de render, se crea con la libreria un modulo render para que me traiga los links
  let render = new marked.Renderer();
  //render me traeen un funcion el archivo.. la liga, el titulo y el texto
  render.link = function(href, title, text) {
    //se crea un objeto con las caracteristicas que estoy pudiendo
    obj = {
      links: href,
      text: text,
      route: file
    };
    //en links voy a empujar mi objeto que estoy mandando traer
    links.push(obj);
    //me retorna el objeto
    return obj;
  };
  //me retorna el render final.
  return render;
};

//funcion para encontar el url
const newUrl=(array) => {
  //arrego de promesas vacio
  let mypromes = [];
  array.forEach(function(element, index) {
    mypromes.push(new Promise((resolve, reject) => {
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

pathAbsolute('README.md')
  .then(route => readFile(file))
  .then(md => convertMd(md, file))
  .then(links => newUrl(links))
  .catch(error => {
    console.log('Ocurrio un error', error);
  });

module.exports = {
  pathAbsolute,
  readFile,
  convertMd,
  newUrl
};
