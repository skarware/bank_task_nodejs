import Bank from './Bank.js';
import Utils from './Utils.js';
import fs from 'fs';

/**
 * Reads JSON file, removes any trailing commas, converts snake_case to camelCase;
 * parses it while transforms date string to Date object and returns as transaction objects array.
 * NOTE: function won't fit in Utils as function is quite specific for the app.
 */
function transactionsFileReader(filePath) {
    let data;

    if (filePath) {
        try {
            // take and read file passed as argument to the function
            data = fs.readFileSync(filePath, 'utf-8');
        } catch (error) {
            console.error('FILE READ ERROR:')
            throw error;
        }
    } else {
        console.error('Please provide JSON data input file as third argument.');
        process.exit();
    }

    // remove all trailing commas from JSON input
    data = Utils.removeTrailingComma(data);

    // converts snake case to Camel Case
    data = Utils.camelCase(data);

    // parse JSON string into an array of transaction objects and return it
    return JSON.parse(data, Utils.toDateObj);
}

/**
 * main initialization function is the entry point into the application.
 * To keep it simple function reads just one input file from args parameter at index 2;
 * input file should be valid JSON file thought app will try to fix any trailing commas;
 * if input data contains transactions the app will process and print commission fees to STDOUT.
 */
const main = function mainInitializationFunction(args) {
    // get input JSON file path from command line arguments
    const filePath = args[2];

    // create Vilnius' bank branch
    let bankVilniusBranch = new Bank('Vilniaus filialas');

    // get transactions from JSON file
    let transactionsArr = transactionsFileReader(filePath);

    // Process all transactions in array and print commission fees into STDOUT
    transactionsArr.forEach(el => bankVilniusBranch.processTransaction(el));
}

/**
 * To start the application invoke the main function and pass as an argument 'process.argv' (command line arguments) to read data
 * input JSON file as third command line argument to the app (node app.js input.json) and process the data as transactions if any.
 */
main(process.argv);

