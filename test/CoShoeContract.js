/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { CoTokenContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logging = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('CoTokenContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new CoTokenContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs().resolves(Buffer.from('{"value":"shoe 1001 value"}'));
    });

    describe('#TokenMinted', () => {

        it('should call the constructor and deploy the contract', async () => {
            await contract.constructor(ctx).should.eventually.be.true;
        });

    });

    describe('#buyShoe', () => {

        it('should create a song', async () => {
            await contract.buyShoe(ctx, 'blue sneakers', 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiEpr7dm-vjAhXID2MBHXnFDbsQjRx6BAgBEAU&url=https%3A%2F%2Fwww.dmarge.com%2F2019%2F05%2Fbest-blue-sneakers.html&psig=AOvVaw26TLW3MQF7OI5I4dkidS8k&ust=1565076804296354');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"song 1003 value"}'));
        });
    });

    describe('#buyShoeReverts', () => {

        it('should return a song', async () => {
            await contract.buyShoe(ctx, '1001').should.eventually.deep.equal({ value:0x6c331b7AAFFB6e3557E039A5364dA0bd5510104C });
        });

        it('should throw an error and reverts', async () => {
            await contract.buyShoe(ctx, 0x6c331b7AAFFB6e3557E039A5364dA0bd5510104C).should.be.rejectedWith(/not owner/);
        });

    });

    describe('#checkPurchases', () => {

        it('should check that the method returns the correct number of trues', async () => {
            await contract.ucheckPurchases(ctx, 0x6c331b7AAFFB6e3557E039A5364dA0bd5510104C);
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":0x6c331b7AAFFB6e3557E039A5364dA0bd5510104C}'));
        });

    });

});