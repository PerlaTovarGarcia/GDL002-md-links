const {pathAbsolute, readFile,convertMd} = require('../index.js');

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
})
