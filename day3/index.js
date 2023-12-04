const fs = require('fs');
const list = fs.readFileSync('./input.txt').toString()
const schematics = list.split('\r\n')
const schematicArray = schematics.map(schems => schems.split('').map(element => element === '.' ? undefined : element))
let cumSum = 0
let numbersLocations = []
let i = 0
const touchingAsterisk = {}
while (i < schematicArray.length) {
  let j = 0;
  let row = schematicArray[i]
  numbersLocations.push([])
  while(j < row.length) {
    let startIndex = j
    let endIndex = j
    let foundNumber = ''
    let symbolFound = false
    while(!isNaN(row[j])) {
      foundNumber += row[j]
      endIndex = j
      j += 1
    }
    if (foundNumber) {
      numbersLocations[i].push({
        startIndex, 
        endIndex,
        foundNumber
      })
      for (k = i - 1; k <= i + 1; k++) {
        if (k < 0 || k >= schematicArray.length) { continue; }
        for (l = startIndex - 1; l <= endIndex + 1; l++) {
          if (l < 0 || l >= row.length) { continue; }

          if (schematicArray[k][l] !== undefined && isNaN(schematicArray[k][l])) {
            symbolFound = true
            if (schematicArray[k][l] === '*') {
              if (touchingAsterisk[`[${[k]},${[l]}]`]) {
                touchingAsterisk[`[${[k]},${[l]}]`].push(foundNumber)
              } else {
                touchingAsterisk[`[${[k]},${[l]}]`] = [foundNumber]
              }
            }
            break
          }
        }
        if (symbolFound) { break; }
      }
      if (symbolFound) { cumSum += parseInt(foundNumber); }
    }
    j += 1
  }
  i += 1
}
const gearRatios = Object.keys(touchingAsterisk).filter(key => touchingAsterisk[key].length  === 2).reduce((acc, key) => acc + (parseInt(touchingAsterisk[key][0]) * parseInt(touchingAsterisk[key][1])), 0)
console.log(cumSum)
console.log(gearRatios)
