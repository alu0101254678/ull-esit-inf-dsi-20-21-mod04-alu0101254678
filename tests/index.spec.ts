import 'mocha';
import {expect} from 'chai';
import {add} from '../src/index';

describe('Tests de la funcion suma', () => {
  it('Se suman dos numeros correctamente', () => {
    expect(add(2, 6)).to.be.equal(8);
  });
});
