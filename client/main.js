var parse = require('emailjs-mime-parser').default
var Buffer = require('buffer').Buffer
global.window.parseEmail = parse ;
global.window.Buffer = Buffer
