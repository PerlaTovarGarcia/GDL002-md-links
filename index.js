const fs = require('fs');
const path = require('path');// nombre de la variable igual que el nombre del modulo
const marked = require('marked');
const fetch = require('node-fetch');

//si la ruta es absoluta
const pathAbsolute = (pathEvalue) => {           //booleano
    return path.isAbsolute(pathEvalue)
};
//si la ruta es relativa.
const relativePath = (pathRelative) => {
    return path.resolve(pathRelative)
};
//evaluar si es un directorio
const pathDirectory = (pathEvalue) => {
    return fs.lstatSync(pathEvalue).isDirectory();
 };

const pathFile = (pathEvalue) => {
    return fs.lstatSync(pathEvalue).isFile();
 };

const fileMD = (route) => {
    return path.extname(route) === '.md';
 };

const contentFiles = (route) => {
    let contentFileMD = [];
     if (pathFile(route)) {
        if (fileMD(route)){
            contentFileMD.push(route)
        }
     } if (pathDirectory(route)){
        let files = fs.readdirSync(route);   //trae el nombre de cada uno de los que está dentro del directorio
        files.forEach((name) => {
            contentFileMD = contentFileMD.concat(contentFiles(path.join(route, name)));
        })
     }
     return contentFileMD;
  };

const getLinks = (arrayRoutesMD) => {
    let arrayObjLinks = [];
    arrayRoutesMD.forEach((routeMD) => {
        const readFiles =  fs.readFileSync(routeMD, 'utf8');
        const renderer = new marked.Renderer();
        renderer.link = (href, __, text) => {
            arrayObjLinks.push({ href, text, file: routeMD });
            return '';
      }
      marked(readFiles, {renderer});
    })
    return arrayObjLinks;
};

const validateLinks = (arrayObjLinks) => {
    const roveArrObj = arrayObjLinks.map((links) => {
        return new Promise ((resolve)=>{
         fetch(links.href)
           .then(res => {
             if (res.status >= 200 && res.status < 400) {
               links.status = res.status;
               links.message = 'OK';
               resolve(links);
             } else {
               links.status = res.status;
               links.message = 'Fail';
               resolve(links);
             }
           }).catch(error => {
            links.status = '';
            links.message = 'Not Found';
            resolve(links);
           });
       });
   });
   return Promise.all(roveArrObj);
   };


const statsOfLinks = (arrObjLinks) => {
        const validate = validateLinks(arrObjLinks);
        return new Promise ((resolve)=>{
           validate.then((links)=>{
               const allLinks = links.length;
           const linksUniques = [...new Set(links.map(links => links.href))].length;
           resolve(`Total: ${allLinks} Unico: ${linksUniques}`);
        })
      })
   };

const linksBroken = (arrObjLinks) => {
       const validate = validateLinks(arrObjLinks);
       return new Promise ((resolve)=>{
          validate.then((link)=>{
          const getBroken = link.filter(links => links.message === 'Fail');
          const brokens = getBroken.length;
          resolve(`Enlace roto: ${brokens}`);
       })
     })
   };




const mdLinks = (path, options) => {

     let pathAbs;
     if (!pathAbsolute(path)) {
       pathAbs = relativeAbsolute(path);
     } else {
       pathAbs = path;
     };
     return new Promise((resolve) => {
       if (!options.validate) {
         resolve(getLinks(contentFiles(pathAbs)));
       } if (options.validate) {
         resolve(validateLinks(getLinks(contentFiles(pathAbs))));
       }
     })
  };

   module.exports = {
     pathAbsolute,
     relativePath,
     pathDirectory,
     pathFile,
     fileMD,
     contentFiles,
     getLinks,
     validateLinks,
     statsOfLinks,
     linksBroken,
     mdLinks,
     mdLinks
   };

/*
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
*/
