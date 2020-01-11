/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  // We need mathJS to handle fractional inputs
  let mathjs = require('mathjs');
  
  // These search the string for one of the six valid units
  let galRegex = /^gal$/i;
  let lbsRegex = /^lbs$/i;
  let miRegex = /^mi$/i;
  let LRegex = /^L$/i;
  let KgRegex = /^Kg$/i;
  let KmRegex = /^Km$/i;
  
  // This is used to find the index of the first letter, signifying the end of the number
  let letterRegex = /[a-z]/i;
  // This detects the presence of number characters, otherwise defaulting to 1
  let numberRegex = /[\d./]+/g;

  
  // These variables are instantiated now to be used in multiple functions
  let number;
  let unit;
  let inputWord;
  let outputWord;
  
  this.getNum = function(input) {
    
    // If no number is present in the string, default to 1
    if (input.match(numberRegex) == null) {
      return number = 1;
    }
    
    // Isolate the numeric value by taking everything before the first letter character
    var result = input.slice(0, input.indexOf(input.match(letterRegex)));
    
    // Test for invalid number by extracting the rest of the string. If there are numbers present here, then the number is invalid
    var restOfString = input.slice(input.indexOf(input.match(letterRegex)), input.length)

    if (restOfString.match(numberRegex)) {
      return number = "invalid number"
    }
    
    // run the result through mathjs incase of a decimal input, assign that value to number variable for conversion
    number = mathjs.evaluate(result);

    return number;
  };
  
  this.getUnit = function(input) {
    
    // Checks for one of the six valid unit types...
    
    // To allow for correct units, but incorrect numbers, I take the first letters, and remove any numbers
    var result = input.slice(input.indexOf(input.match(letterRegex)), input.length)
    result = result.replace(numberRegex, "")

    if (result.match(KgRegex)) {
      unit = "Kg";
      inputWord = "kilograms";
    } else if (result.match(KmRegex)) {
      unit = "Km";
      inputWord = "kilometers";
    } else if (result.match(galRegex)) {
      unit = "gal";
      inputWord = "gallons";
    } else if (result.match(lbsRegex)) {
      unit = "lbs";
      inputWord = "pounds";
    } else if (result.match(miRegex)) {
      unit = "mi";
      inputWord = "miles";
    } else if (result.match(LRegex)) {
      unit = "L";
      inputWord = "liters";
    } else {
      unit = "invalid unit"
    }
        
    return unit;
    
  };
  
  this.getReturnUnit = function(initUnit) {
    
    // Determine the appropriate output unit based on the input unit
    
    var result;
    
    if (unit == "Kg") {
      result = "lbs";
      outputWord = "pounds";
    } else if (unit == "Km") {
      result = "mi";
      outputWord = "miles";
    } else if (unit == "L") {
      result = "gal";
      outputWord = "gallons";
    } else if (unit == "lbs") {
      result = "Kg";
      outputWord = "kilograms";
    } else if (unit == "mi") {
      result = "Km";
      outputWord = "kilometers";
    } else if (unit == "gal") {
      result = "L";
      outputWord = "liters"
    }
    
    return result;
  };

  this.convert = function(initNum, initUnit) {
    
    // If a valid number and unit are detected, multiply or divide by the appropriate conversion constant
    
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    var result;
    
    if (number == "invalid number") {
      return;
    }
    
    if (unit == "Kg") {
      result = number / lbsToKg;
    } else if (unit == "Km") {
      result = number / miToKm;
    } else if (unit == "L") {
      result = number / galToL;
    } else if (unit == "lbs") {
      result = number * lbsToKg;
    } else if (unit == "mi") {
      result = number * miToKm;
    } else if (unit == "gal") {
      result = number * galToL;
    } else {
      return;
    }
    
    return result.toFixed(5);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    
    if (number == "invalid number" && unit == "invalid unit") {
      return "invalid number and unit"
    } else if (number == "invalid number") {
      return "invalid number"
    } else if (unit == "invalid unit") {
      return "invalid unit"
    } else
    
    return initNum + " " + inputWord + " converts to " + returnNum + " " + outputWord;
    
  };
  
}

module.exports = ConvertHandler;