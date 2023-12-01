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
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9
}
const allValueIndexOf = (value, search) => [...value.matchAll(new RegExp(search, 'gi'))].map(a => a.index)
const searchString = Object.keys(conversion).join('|')
const regex = new RegExp(searchString, 'g')
console.log(codes.reduce((acc, code) => {
  const values = {}
  Object.keys(conversion).forEach(key => {
    const indecies = allValueIndexOf(code, key)
    indecies.forEach(index => values[index] = conversion[key])
  })
  const indecies = Object.keys(values).sort((a, b) => a - b)
  if (indecies.length)
    lineValueNumber = parseInt(`${values[indecies[0]]}${values[indecies[indecies.length - 1]]}`)
  return acc + lineValueNumber
}, 0))