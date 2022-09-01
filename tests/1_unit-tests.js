const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    let number, unit;
    test('convertHandler should correctly read a whole number input.', async (done) => {
        number = convertHandler.getNum("3432L");
        assert.equal(number, 3432);

        number = convertHandler.getNum("0km");
        assert.equal(number, 0);

        done()
    });

    test('convertHandler should correctly read a decimal number input.', async (done) => {
        number = convertHandler.getNum("3.442323mil");
        assert.equal(isNaN(number), false);
        assert.approximately(number, 3.44232, 0.0005)

        number = convertHandler.getNum("3.4.4km");
        assert.isUndefined(number)

        done();
    })

    test('convertHandler should correctly read a fractional input.', async (done) => {
        number = convertHandler.getNum("1/2gal");
        assert.equal(number, 0.5);

        number = convertHandler.getNum('1/2/3km')
        assert.isUndefined(number);

        done();
    })

    test('convertHandler should correctly read a fractional input with a decimal.', async (done) => {
        number = convertHandler.getNum('5/2.5km')
        assert.equal(number, 2)
        done();
    })

    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', async (done) => {

        number = convertHandler.getNum('1/2/3km')
        assert.isUndefined(number);

        done();
    })


    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', async (done) => {

        number = convertHandler.getNum('km')
        assert.equal(number, 1);

        done();
    })


    test('convertHandler should correctly read each valid input unit.', async (done) => {

        unit = convertHandler.getUnit("1km");
        assert.equal(unit, 'km');
        unit = convertHandler.getUnit('1l');
        assert.equal(unit, 'L')
        unit = convertHandler.getUnit('kg');
        assert.equal(unit, 'kg')
        unit = convertHandler.getUnit('2/3lbs');
        assert.equal(unit, 'lbs')
        unit = convertHandler.getUnit('4.44mi');
        assert.equal(unit, 'mi')
        unit = convertHandler.getUnit('4.44gal');
        assert.equal(unit, 'gal')
        done();
    })

    test('convertHandler should correctly return an error for an invalid input unit.', async (done) => {

        unit = convertHandler.getUnit('1gram')
        assert.isUndefined(unit)
        done();
    })

    test('convertHandler should return the correct return unit for each valid input unit.', async (done) => {

        assert.equal(convertHandler.getReturnUnit('kg'), 'lbs')
        assert.equal(convertHandler.getReturnUnit('lbs'), 'kg')
        assert.equal(convertHandler.getReturnUnit('L'), 'gal')
        assert.equal(convertHandler.getReturnUnit('gal'), 'L')
        assert.equal(convertHandler.getReturnUnit('km'), 'mi')
        assert.equal(convertHandler.getReturnUnit('mi'), 'km')

        done();
    })

    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', async (done) => {

        assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms')
        assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds')
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles')
        assert.equal(convertHandler.spellOutUnit('L'), 'liters')
        assert.equal(convertHandler.spellOutUnit('gal'), 'gallons')
        assert.equal(convertHandler.spellOutUnit('km'), 'kilometers')
        done();
    })


    test('convertHandler should correctly convert gal to L', async (done) => {

        let num = convertHandler.convert(1, 'gal');
        assert.equal(num, 3.78541);
        done();
    })
    test('convertHandler should correctly convert L to gal.', async (done) => {

        let num = convertHandler.convert(1, 'L');
        assert.equal(num, Number(1 / 3.78541).toFixed(5));
        done();
    })
    test('convertHandler should correctly convert mi to km.', async (done) => {

        let num = convertHandler.convert(1, 'mi');
        assert.equal(num, 1.60934);
        done();
    })

    test('convertHandler should correctly convert km to mi.', async (done) => {

        let num = convertHandler.convert(1, 'km');
        assert.equal(num, Number(1 / 1.60934).toFixed(5));
        done();
    })

    test('convertHandler should correctly convert lbs to kg.', async (done) => {

        let num = convertHandler.convert(1, 'lbs');
        assert.equal(num, Number(0.453592).toFixed(5));
        done();
    })

    test('convertHandler should correctly convert kg to lbs.', async (done) => {

        let num = convertHandler.convert(1, 'kg');
        assert.equal(num, Number(1 / 0.453592).toFixed(5));
        done();
    })










});
