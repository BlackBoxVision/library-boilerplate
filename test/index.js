const { expect } = require('chai');

const { getHelloMessage } = require('../lib');

describe("Hello World", () => {
    it("Message is a String", _ => {
        const msg = getHelloMessage();
        expect(msg).to.be.a("string");
    });

    it("Message returns Hello World", _ => {
        const msg = getHelloMessage();
        expect(msg).to.equal("Hello World");
    });
});