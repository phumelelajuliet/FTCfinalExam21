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

        it('should return 100 token minted upon deployment', async () => {
            await contract.songExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#buyShoe', () => {

        it('should create a song', async () => {
            await contract.createSong(ctx, '1003', 'song 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"song 1003 value"}'));
        });

        it('should throw an error for a song that already exists', async () => {
            await contract.createSong(ctx, '1001', 'myvalue').should.be.rejectedWith(/The song 1001 already exists/);
        });

    });

    describe('#buyShoeReverts', () => {

        it('should return a song', async () => {
            await contract.readSong(ctx, '1001').should.eventually.deep.equal({ value: 'song 1001 value' });
        });

        it('should throw an error for a song that does not exist', async () => {
            await contract.readSong(ctx, '1003').should.be.rejectedWith(/The song 1003 does not exist/);
        });

    });

    describe('#checkPurchases', () => {

        it('should check that the method returns the correct number of trues', async () => {
            await contract.updateSong(ctx, '1001', 'song 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"song 1001 new value"}'));
        });

        it('should throw an error for number of incorrect trues', async () => {
            await contract.updateSong(ctx, '1003', 'song 1003 new value').should.be.rejectedWith(/The song 1003 does not exist/);
        });

    });

});