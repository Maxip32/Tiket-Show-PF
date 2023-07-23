const {Date} = require('../../db');

const theDate = async ()=>{
    const allDates = await Date.findAll();
    return allDates;
  
}

module.exports = theDate