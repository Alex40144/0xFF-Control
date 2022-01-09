// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const serialport = require('serialport')
const Readline = require('@serialport/parser-readline')
const tableify = require('tableify')


async function listSerialPorts() {
  await serialport.list().then((ports, err) => {
        if(err) {
            document.getElementById('error').textContent = err.message
            return
        } else {
            document.getElementById('error').textContent = ''
        }
        //console.log('ports', ports);

        if (ports.length === 0) {
            document.getElementById('error').textContent = 'No ports discovered'
        }

        tableHTML = tableify(ports)
        document.getElementById('ports').innerHTML = tableHTML
  })
}

// Set a timeout that will check for new serialPorts every 2 seconds.
// This timeout reschedules itself.
setTimeout(function listPorts() {
  listSerialPorts();
  setTimeout(listPorts, 2000);
}, 2000);

const port = new serialport('COM3', {baudRate: 115200}, function (err) {
    if (err) {
      return console.log('Error: ', err.message)
    }
})

const parser = port.pipe(new Readline({ delimiter: '\n' }))
parser.on('data', console.log)