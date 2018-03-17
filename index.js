var scanHtmlFile = require('./app.js');
var Input = require('./src/input.js');
var Output = require('./src/output.js');
var fs = require('fs');

require('dotenv').config({path: './.env'});
console.log(process.env.FOO);
console.log(process.env.BAR);
console.log(process.env.BAZ);
console.log(process.env.STRONG_LIMIT);


/**
 * Setup pre-defined SEO rules
 */
var rules = {
	    img: 'alt', // if there are any <img />tags without alt attribute
	    a: 'rel', // if there are any <a />tags without rel attribute
	    head: {
	        title: true, // if there is any header that doesn’t have <title>tag
	        meta: ["description", "robots", "keywords"], // If you want to implement additional rule for meta tag, you just need to add a new tag to array.
	    },
	    strong: process.env.STRONG_LIMIT, // there are more than 15 <strong>tag in HTML
	    h1: 1, // if a HTML have more than one <H1>tag
	};


var scanHtmlFile = new scanHtmlFile();

/**
 * Setup The input is A HTML file from the path
 * @param {object} input - used to feed in HTML file source
 */
scanHtmlFile.setInput(new Input().createInputFile(__dirname+"/public/files/index.html"));

/**
 * Setup the input is A Node Readable Stream
 * @param {object} input - used to feed in HTML file source
 */
// var readable_stream = fs.createReadStream(__dirname+"/test/Node.js.html");
// scanHtmlFile.setInput(new Input().createInputStream(readable_stream));

/**
 * Setup the output is console
 * @param {object} output - console
 */
scanHtmlFile.setOutput(new Output().createOutputConsole());

/**
 * Setup the output is a file
 * @param {object} output - used to feed in HTML file source
 */
// scanHtmlFile.setOutput(new Output().createOutputFile(__dirname+"/public/files/outputs/output.txt"));


/**
 * Setup the output is A Node Readable Stream
 * @param {object} output - used to feed in HTML file source
 */
// var writeable_stream = fs.createWriteStream(__dirname + '/outstream.txt')
// scanHtmlFile.setOutput(new Output().createOutputStream(writeable_stream));

console.log("**************** Show all of the SEO defects *******************");
scanHtmlFile.detectSEOtag(rules);

