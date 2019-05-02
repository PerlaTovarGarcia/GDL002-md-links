// nombre de la variable igual que el nombre del modulo
const fs = require('fs');//modulo de node para los archivos
const path = require('path');//Modulo node para checar las rutas.
const marked = require('marked');//libreria
const fetch = require('node-fetch');// Requerir fetch para peticiones a urls
var file = ('./README.md');


// se hace una funcion para buscar la puta del link
const pathLink =(route)=>{

  return new Promise(function(resolve, reject) {
    resolve(file = path.resolve(route));
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
  let mypromise = [];
  //se crea un forEach para interar en el array si hay links
  array.forEach(function(element, index) {
    mypromise.push(new Promise((resolve, reject) => {
      //se crea el fetch para tener el resultado de links
      fetch(element.links).then(res => {
        element.status = res.status;
        element.statusText = res.statusText;
        resolve(element);
      }).catch(err => {
        element.status = error.code;
        element.statusText = "fail";
        resolve(element);
      });
    }));
  });
//se cumple cuando todas las promesas del iterable dado se han cumplido, o es rechazada si alguna promesa no se cumple
Promise.all(mypromise).then(values => {
   console.log(values);
  }).catch(reason => {
    console.log(reason);
  });

};


const mdLinks = (file) => {

  const promise = new Promise((resolve, reject) => {
    if(!file) {
      return reject(`No se reconoce el archivo ${file}`);
    }
    else {
      return resolve (newUrl(convertMd(file)));
    }
  })


  promise
  .then((response) => {
    return response;
  })
  .catch((err) => {
    console.error(`ERROR: ${err}`);
  });
}
/*pathLink(file)
  .then(route => readFile(file))
  .then(md => convertMd(md, file))
  .then(links => newUrl(links))
  .catch(error => {
    console.log('Ocurrio un error', error);
  });*/

module.exports = {
  mdLinks,
  pathLink,
  readFile,
  convertMd,
  newUrl
};
