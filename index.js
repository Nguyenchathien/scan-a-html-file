var scanHtmlFile = require('./app.js');
var Input = require('./src/input.js');
var Output = require('./src/output.js');
var fs = require('fs');

require('dotenv').config({path: './.env'});

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
scanHtmlFile.setInput(new Input().createInputFile(__dirname + process.env.INPUT_FILE_PATH));

/**
 * Setup the input is A Node Readable Stream
 * @param {object} input - used to feed in HTML file source
 */
// var readable_stream = fs.createReadStream(__dirname + process.env.OUTPUT_FILE_PATH);
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
// scanHtmlFile.setOutput(new Output().createOutputFile(__dirname + process.env.OUTPUT_FILE_PATH));


/**
 * Setup the output is A Node Readable Stream
 * @param {object} output - used to feed in HTML file source
 */
// var writeable_stream = fs.createWriteStream(__dirname + process.env.OUTSREAM_FILE_PATH)
// readableStream.setEncoding('utf8');
// scanHtmlFile.setOutput(new Output().createOutputStream(writeable_stream));

console.log("**************** Show all of the SEO defects *******************");
console.log("");
scanHtmlFile.detectSEOtag(rules);

