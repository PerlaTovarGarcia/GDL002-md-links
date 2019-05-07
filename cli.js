const { mdLinks } = require ('./index.js');
const chalk = require('chalk');
 const path = process.argv[2];
 const oneOption = process.argv[3];
 const twoOption = process.argv[4];


 if( oneOption === '--validate' && twoOption === '--stats' ||  oneOption === '--stats' && twoOption === '--validate'){
    mdLinks(path, {validate:true})
    .then(res => {
      statsOfLinks(res).then(res => console.log(res))
      linksBroken(res).then(res => console.log(res))
    })
 } else if (oneOption === '--validate' || oneOption === '--v'){
  mdLinks(path, {validate:true})
  .then(res => { res.forEach( (objLinks) => { console.log (chalk.magenta (`file:  ${objLinks.file},`) + chalk.cyan( `\nhref: ${objLinks.href},`)+ chalk.yellow (`\nmessage:${objLinks.message},`)+ chalk.red(`\nstatus:${objLinks.status},`)+ chalk.green(`\ntext:${objLinks.text}`))})})
  .catch(error => console.log(error))
 } else if(oneOption === '--stats' || oneOption === '--s'){
  mdLinks(path, {validate:false})
  .then(res => {
    statsOfLinks(res).then(res => console.log(res))
  })
 } else{
  mdLinks(path, {validate:false})
  .then(res => { res.forEach( (objLinks) => { console.log(chalk.bgCyan(`file: ${objLinks.file},`)+ chalk.bgCyan(`\nhref: ${objLinks.href},`)+chalk.bgCyan (`\ntext:${objLinks.text}`))})})
 }
