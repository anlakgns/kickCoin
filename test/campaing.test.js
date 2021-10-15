const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());


const compiledFactory = require('../ethereum/build/CampaingFactory.json');
const compiledCampaing = require('../ethereum/build/Campaing.json');

let accounts // dummy accounts in ganache test env.
let factory // deployed instance of factory contract.
let campaing // deployed instance of campaign contract.
let campaingAddress

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  await factory.methods.createCampaing("100").send({
    from: accounts[0],
    gas: "1000000",
  });

  [campaingAddress] = await factory.methods.getDeployedCampaings().call();
  campaing = await new web3.eth.Contract(
    JSON.parse(compiledCampaing.interface),
    campaingAddress
  );
});


describe('Campaing', ()=> {
  it('deploys a factory and a campaign', ()=> {
    assert.ok(factory.options.address)
    assert.ok(campaing.options.address)
  })

  it('marks caller as the campaing manager', async ()=> {
    const manager = await campaing.methods.manager().call();
    assert.strictEqual(accounts[0], manager)
  })

  it('allows people to contribute money and marks them as supporters.', async () => {
    await campaing.methods.contribute().send({
      value: "200",
      from: accounts[1]
    })

    const isContributor = await campaing.methods.supporters(accounts[1]).call()
    assert(isContributor)
  })

  it("requires a minimum contribution", async ()=> {
    try {
      await campaing.methods.contribute().send({
        value: "5",
        form: accounts[1]
      })
      assert(false)
    } catch(err) {
      assert(err)
    }
  }) 


  it("allows a manager to make a payment request", async ()=> {
    
    await campaing.methods.createRequest("buy batteries", "100", accounts[1]).send({
      from: accounts[0],
      gas: "1000000"
    })

    const request = await campaing.methods.requests(0).call();

    assert.strictEqual("buy batteries", request.description)
  })


  it('processes requests', async ()=> {
    await campaing.methods.contribute().send({
      from: accounts[1],
      value: web3.utils.toWei('10', "ether")
    })

    await campaing.methods.createRequest('A', web3.utils.toWei('5', 'ether'), accounts[2]).send({
      from: accounts[0],
      gas: "1000000"
    })


    await campaing.methods.approveRequest(0).send({
      from: accounts[1],
      gas: "1000000"
    })

    await campaing.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000"
    })


    let balance = await web3.eth.getBalance(accounts[2]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);

    assert(balance > 104)
  })
})