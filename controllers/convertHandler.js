
function numberStringSplitter(input) {
  let number = input.match(/[.\d\/]+/g) || ["1"];
  let unit = input.match(/[a-zA-Z]+/g)[0];
  return [number[0], unit];
}


function checkDivision(possibleFraction) {
  let nums = possibleFraction.split('/');
  if (nums.length > 2) return undefined;
  return nums;
}

function ConvertHandler() {

  this.getNum = function (input) {
    let result;
    let number = numberStringSplitter(input)[0];



    // check if it is a proper fraction.
    let nums = checkDivision(number);

    if (!nums) return undefined;
    let num1 = nums[0];
    let num2 = nums[1] || '1';

    result = parseFloat(num1) / parseFloat(num2);

    if (isNaN(num2) || isNaN(num1)) return undefined;

    return result;
  };

  this.getUnit = function (input) {
    let result = numberStringSplitter(input)[1].toLowerCase();

    if (result === 'l') return "L"
    if (['mi', 'lbs', 'gal', 'km', 'kg'].includes(result)) return result;

    return undefined;
  };

  this.getReturnUnit = function (initUnit) {

    const equivalentUnits = {
      mi: "km",
      lbs: "kg",
      gal: "L",
      L: "gal",
      kg: "lbs",
      km: "mi"
    }

    if (!Object.keys(equivalentUnits).includes(initUnit))
      return undefined

    return equivalentUnits[initUnit];
  };

  this.spellOutUnit = function (unit) {
    unit = unit.toLowerCase();

    const v = {
      km: "kilometers",
      mi: "miles",
      lbs: "pounds",
      l: "liters",
      kg: "kilograms",
      gal: "gallons",
    }

    if (!Object.keys(v).includes(unit)) return "don't know";

    return v[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case "km": result = initNum / miToKm; break;
      case "mi": result = initNum * miToKm; break;
      case "gal": result = initNum * galToL; break;
      case "L": result = initNum / galToL; break;
      case "lbs": result = initNum * lbsToKg; break;
      case "kg": result = initNum / lbsToKg; break;
    }

    result = parseFloat(result.toFixed(5));
    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

}

module.exports = ConvertHandler;
