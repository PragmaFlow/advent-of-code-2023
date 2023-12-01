const fs = require('fs');
const list = fs.readFileSync('./day1list.txt').toString()
const codes = list.split('\r\n')
const conversion = { 
  "one": 1, 
  "two": 2,
  "three": 3, 
  "four": 4, 
  "five": 5, 
  "six": 6, 
  "seven": 7, 
  "eight": 8, 
  "nine": 9,
}
console.log(codes.reduce((acc, code, i) => {
  let expanded = code
  Object.keys(conversion).forEach(key => {
    expanded = expanded.replaceAll(key, `${key}${conversion[key]}${key}`)
  })
  const numbers = expanded.split('').filter(c => !isNaN(c))
  let lineValueNumber = 0
  if (numbers.length)
    lineValueNumber = parseInt(numbers[0] + numbers[numbers.length - 1])
  return acc + lineValueNumber
}, 0))