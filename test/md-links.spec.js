const {pathAbsolute, readFile} = require('../index.js');

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
