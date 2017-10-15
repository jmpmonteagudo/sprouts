var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const IPFS = require('ipfs')
const node = new IPFS()

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile('index');
});

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});

node.on('ready', () => {
    // Your node is now ready to use \o/
    console.log('ready');

    // stopping a node
    node.stop(() => {
        // node is now 'offline'
    })
})