if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    console.log(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    console.log('connected to localhost');
}

var accs = web3.eth.accounts;
// var voterX = '0x007A0f7cc9039E4797514401900774aAc946c476';
// var voterY = '0x0009bE4AcDb755e3225Eb51A2Ab8499bfa6b7217';
// var proposalA = '0x00D9f2c3769736a2950E9D31d418C998D6D55063';
// var proposalB = '0x006aA29639830814cBB949Cf85FAd1AdD86069C6';

var proposals = ['0x332413cc92cdd0a9c64a0ea782319a9fa23a9606', '0xd1b8d3780442ac186ef18ca6ab0a96f8967b431a', '0x8091147064d21caa2f1c652de00ac90dd526ad6b'];
// instantiate contract by address
var abiArray = [{ "constant": true, "inputs": [], "name": "maxFundedProposal", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "balances", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_proposal", "type": "address" }], "name": "vote", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalBalance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "finalizeProposal", "outputs": [{ "name": "_proposal", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "message", "type": "string" }], "name": "Error", "type": "event" }]
var MyContract = web3.eth.contract(abiArray);
var contractAddress = "0x06Ef9a3d05F8F437D701a9869A0fB7078Fc8C207";
var contract = MyContract.at(contractAddress);
var userDeposit; // updated with updateBalance()
updateBalance();

function vote(proposalID) {

    // currently hard code
    var proposal = proposals[proposalID];
    var value = prompt("How many weis would u like to give to the project?", 0);
    if (value == null) return;
    //TBD: from account 
    console.log(contract);
    web3.eth.sendTransaction({ to: contractAddress, value: value }, function (err, txHash) {
        if (!err) {
            contract.vote(proposal, function (err, txHash) {
                if (!err) console.log(txHash);
                else console.log(err);
            });
        }
        else console.log(err);
    });
}

function updateBalance() {
    if (contract) {
        console.log(contract);

        var balance = contract.balances(accs[0], function (err, receipt) {
            if (!err) {
                if (userDeposit == receipt.toNumber()) return;
                console.log(receipt.toNumber());
                $('#balance').html('My Balance: ' + receipt.toNumber() + ' wei');
                userDeposit = receipt.toNumber();
            } else console.log(err);
        });
    } else {
        $('#balance').html('fetching...')
    }
}

// update user's deposit every 5 sec
setInterval(function () {
    updateBalance();
}, 5000);