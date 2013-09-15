etherio24
=========

An interface module to the Elexol Ether IO24 module

## Objective

My motivation is two-fold. First is to replace the ancient irrigation control we
currently have. The second was to learn node.js & asynchronous (event) based
programming.

I plan to use a Raspberry Pi and it's built in IO but I built this on a server
running Linux and external IO (the Elexol Ether IO board). One of the features
I want is a web interface and access to external information to allow certain
conditions to be met to allow the schedule to run. Another is the use of cron
like schedule syntax for flexibility. 

## Usage
```JavaScript
eio = require(etherio24)("etherio24.uucp", 2424);
```
or
```JavaScript
var eio = new Etherio24("etherio24.uucp", 2424);
```
## Version

0.1 Beta (hey, I'm still working here ;-) )

## TODO

- [ ] Need the initialization routine setup for the Elexol Ether IO board
- [ ] Need to provide access to methods to setup the IO24 board
- [ ] Need to provide access to method to rest the board
- [ ] Need to provide access to methods to get the return data from UDP requests

## Notes


## Installation

## Tests

## Contributors & Credits

## License
While I have really decided I'm leaning towards the GPL and either v2 or v3 . At the
moment this isn't officially released so I'll decide soon.

## Developing
