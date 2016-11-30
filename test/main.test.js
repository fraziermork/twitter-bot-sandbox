/* eslint func-names: "off" */
/* eslint prefer-arrow-callback: "off" */

// Not sure why this breaks mocha 
// import chai from 'chai';

const chai = require('chai');

const expect = chai.expect;

describe('test if this will work with travis', function() {
  it('should agree that true is true', function() {
    expect(true).to.equal(true);
  });
});
