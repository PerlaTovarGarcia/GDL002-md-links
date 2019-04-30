const {pathAbsolute, readFile} = require('../index.js');

describe('pathAbsolute', () => {
  it('shoudl be pathAbsolute a function', () => {
    expect(typeof pathAbsolute).toBe('function');
  });
})
