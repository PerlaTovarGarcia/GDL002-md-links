describe('pathToBeAbsolute', () => {
    it('deberia retorar true', () => {
        expect(pathToBeAbsolute('/test/demo_path.js')).toBe(true);
    });
});

describe('pathToBeAbsolute', () => {
    it('deberia retornar false', () => {
        expect(pathToBeAbsolute('test/demo_path.js')).toBe(false);
    });
});

describe('relativeToAbsolute', () => {
    it('deberia retornar ruta absoluta', () => {
        expect(relativeToAbsolute('test/demo_path.js')).toBe(`${process.cwd()}\\test\\demo_path.js`);
    });
});

describe('pathIsDirectory', () => {
    it ('deberia retornar true', () => {
    expect(pathIsDirectory('.\\test')).toBe(true);
    });
});

describe('pathIsFile', () => {
    it ('deberia retornar true', () => {
    expect(pathIsFile('test\\prueba.js')).toEqual(true);
    });
});

describe('contentFiles', () => {
    it('debería retornar un array con todas las rutas MD', () => {
        expect(contentFiles(`${process.cwd()}\\test\\mds`)).toEqual(arrRoutesMD);
        });
});

describe('getLinks', () => {
    it('debería retornar un array de objetos contenniendo: href, text y file', () => {
    expect(getLinks(arrRoutesMD)).toEqual(objLinks);
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
