'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.get('/api/convert', async (req, res) => {
    let input = req.query.input;

    let number = convertHandler.getNum(input);
    let unit = convertHandler.getUnit(input);
    console.log(unit)

    if (!number && !unit) {
      return res.send('invalid number and unit');
    } else if (!number) {
      return res.send('invalid number');
    } else if (!unit) {
      return res.send('invalid unit')
    }

    let ansNum = convertHandler.convert(number, unit);
    let ansUnit = convertHandler.getReturnUnit(unit);
    let toString = convertHandler.getString(number, unit, ansNum, ansUnit);

    // console.log(req.query.input, { ansNum, ansUnit, toString })
    return res.json({
      initNum: number,
      initUnit: unit,
      returnNum: ansNum,
      returnUnit: ansUnit,
      string: toString,
    });
  })

};
