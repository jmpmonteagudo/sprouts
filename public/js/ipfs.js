const Buffer = window.IpfsApi().Buffer;

// Config
var ipfsHost = 'localhost',
    ipfsAPIPort = '5001',
    ipfsWebPort = '8080';

// IPFS
var ipfs = window.IpfsApi(ipfsHost, ipfsAPIPort)
ipfs.swarm.peers(function (err, response) {
    if (err) {
        console.error(err);
    } else {
        //console.log("IPFS - connected to " + response.Strings.length + " peers");
        console.log("IPFS - connected to " + response.Strings + " peers");
        console.log(response);
    }
});

function addFile(url) {
            window.ipfs.add(url, function(err, result) {
                if (err) {
                    console.error('Error sending file: ', err);
                    return null;
                } else if (result && result[0] && result[0].Hash) {
                    var imageURL = window.ipfsDataHost + "/" + result[0].Hash;
                    console.log('File: ', result[0].Hash);
                    console.log(imageURL);
                } else {
                    console.error('No file for you...');
                    return null;
                }
            });
        }

$('#add').click(function () {
    $('#upload').click();
});

function upload() {
      const reader = new FileReader();
      reader.onloadend = function() {
        const ipfs = window.IpfsApi('localhost', 5001) // Connect to IPFS
        const buf = buffer.Buffer(reader.result) // Convert data into buffer
        ipfs.add(buf, (err, result) => { // Upload buffer to IPFS
          if(err) {
            console.error(err)
            return
          }
          let url = `https://ipfs.io/ipfs/${result[0].Hash}`
          console.log(`Url --> ${url}`)
          $('#projects').append('<img src="' + url + '" alt="placeholder">');
        })
      }
      const photo = document.getElementById("upload");
      reader.readAsArrayBuffer(photo.files[0]); // Read Provided File
      
}

