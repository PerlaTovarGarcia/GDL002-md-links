const {  pathAbsolute, relativePath, pathDirectory, pathFile, fileMD, contentFiles, getLinks, validateLinks, statsOfLinks, linksBroken, mdLinks } = require ('../index.js');
const {links}= require('../test/pathTest.js')
describe('pathAbsolute', () => {
    it('deberia retorar false', () => {
        expect(pathAbsolute('./test/pathTest.js')).toBe(false);
    });
});



describe('relativePath', () => {
    it('deberia retornar ruta absoluta', () => {
        expect(relativePath('test/pathTest.js')).toBe(`${process.cwd()}/test/pathTest.js`);
    });
});

describe('pathDirectory', () => {
    it ('deberia retornar true', () => {
    expect(pathDirectory('./test')).toBe(true);
    });
});

describe('pathFile', () => {
    it ('deberia retornar true', () => {
    expect(pathFile('test/prueba.js')).toEqual(true);
    });
});





/*const {pathAbsolute, readFile,convertMd} = require('../index.js');

describe('pathAbsolute', () => {
  it('shoudl be pathAbsolute a function', () => {
    expect(typeof pathAbsolute).toEqual('function');
  });
})

describe('readFile', () => {
  it('shoudl be readFile a function', () => {
    expect(typeof readFile).toEqual('function');
  });
})

describe('convertMd', () => {
  it('shoudl be convertMd a function', () => {
    expect(typeof convertMd).toEqual('function');
  });
})*/
