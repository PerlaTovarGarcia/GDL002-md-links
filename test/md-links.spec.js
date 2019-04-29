const pathAbsolute = require('../src/module/path.js');



describe('pathAbsolute',()=>{
  it('es una funcion',()=>{
    expect(pathAbsolute.pathAbsolute).toBe('function');
  });
});
describe('pathAbsolute',()=>{
  it ('deberia retornar true',()=>{
    expect('pathAbsolute',(true)).tobe(true);
  });
});

describe('pathAbsolute',()=>{
  it ('deberia retornar false',()=>{
    expect('pathAbsolute',(false)).tobe(false);
  });
});



/*describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

});*/
