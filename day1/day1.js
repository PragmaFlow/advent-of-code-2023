const fs = require('fs');
const list = fs.readFileSync('./day1list.txt').toString()
const codes = list.split('\r\n')
console.log(codes.reduce((acc, code) => {
  const numbers = code.split('').filter(c => !isNaN(c))
  let lineValueNumber = 0
  if (numbers.length)
    lineValueNumber = parseInt(numbers[0] + numbers[numbers.length - 1])
  return acc + lineValueNumber
}, 0))