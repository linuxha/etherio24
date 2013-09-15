/**
** Etherio constructor - for accessing the Etherio IO24R 24 port digital IO device
**
** Returns a new etherio object for the Elexol Etherio24R
**
** @param	ip host identifier (ip address or FQDN)
** @param	port number to communicate with the etherio device (default 2424)
**
** @returns	new etherio object
*/

Etherio24 = function(ip, port) {
    var dgram = require('dgram');

    this.ip   = ip;             // Can be name or ipv4 address
    this.port = typeof b !== 'undefined' ? port : 2424;         // port number

    // this turns this into a public properties
    this.zone = []; // new Array();

    this.zone.A = 0; // this.zone['A'] = 0;
    this.zone.B = 0;
    this.zone.C = 0;

    // Note that we haven't connected to the device yet
    this.client = dgram.createSocket("udp4");
    // http://stackoverflow.com/questions/6475842/node-js-udp-dgram-handling-error-from-dns-resolution
    // listen for the error (hopefully this will resolve the issue of the uncaught dns error)
    this.client.on("error", function (err) {
        consolelog("Socket error: " + err);
    });
    // Technically, since it's UDP, we never connect to the device but when a
    // packet is sent it's done in the on, off and ping methods
    
    /*
    ** TODO: Need to add the device init sequence here.
	**
    ** set the IO ports to Out
    */
};

/**
** on - turns on a particular Elexol EtherIO port/pin combination
**
** @param	zone object
**
** @returns	nothing
**
** TODO Eventually I'll turn this into a Node.js module
*/
Etherio24.prototype.on = function(zone) {
    var val              = (1<<zone.pin);              // Ex. Pin 3 becomes 0000 0100 or 0x04
    val                  = this.zone[zone.port] | val; // Turn on the bit and leave on the existing bits
    this.zone[zone.port] = val;                        // Turn on the bit and leave on the existing bits

    data = new Buffer(3);

    data.write(zone.port, 0);
    //* @FIXED: When we send an 80 (1000 0000) we get a C2 (1100 0010)
    data.write(String.fromCharCode(val&0x00FF), 1, "binary");
    data.write('\n', 2);

    this.client.send(data, 0, data.length, this.port, this.ip);
};

/**
** off - turns on a particular Elexol EtherIO port/pin combination
**
** @param	zone object
**
** @returns	nothing
**
** TODO Eventually I'll turn this into a Node.js module
*/
Etherio24.prototype.off = function(zone) {
    var val              = ((~(1<<(zone.pin))) & 0x00FF);
    val                  = this.zone[zone.port] & val;  // Turn off the bit and leave on the existing bits
    this.zone[zone.port] = val;                         // Turn off the bit and leave on the existing bits


    data = new Buffer(3);

    data.write(zone.port, 0);
    // Binary is deprecated but this didn't work well with the default UTF
    data.write(String.fromCharCode(val&0x00FF), 1, "binary");
    data.write('\n', 2);
/*
    console.log("Off:");
    console.log(data);
*/
    this.client.send(data, 0, data.length, this.port, this.ip);
};

/**
** ping - validates that the Elexol Ether IO device is available 
**
** @param	none
**
** @returns	true if we get a proper ping repsonse, false othewise
**
** TODO Eventually I'll turn this into a Node.js module
*/
Etherio24.prototype.ping = function() {
	// in addition to sending a UDP request
	// we need to 'wait' for a UDP response
	// TODO: build send and receive logic/code
	return true;
};

module.exports.Etherio24 = Etherio24;
module.exports.on = on;
module.exports.off = off;
module.exports.ping = ping;