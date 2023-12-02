const fs = require('fs');
const list = fs.readFileSync('./day2input.txt').toString()
const games = list.split('\r\n')
const colors = {'green': 0, 'red': 0, 'blue': 0}

const gamesData = games.reduce((acc, game, index) => {
  // game
  // Game 1: 6 green, 3 blue; 3 red, 1 green; 4 green, 3 red, 5 blue
  const [key, value] = game.split(':')
  // key = Game 1
  const currentGame = key.split(' ')[1]
  acc[currentGame] = {...colors}
  // value = 6 green, 3 blue; 3 red, 1 green; 4 green, 3 red, 5 blue
  value.split(';').forEach(draw => {
    // draw = 6 green, 3 blue
    const drawColorCount = draw.split(',')
    drawColorCount.forEach(colorCount => {
      const [count, color] = colorCount.trim().split(' ')
      acc[currentGame][color] = acc[currentGame][color] > +count ? acc[currentGame][color] : +count
    })
  })
  return acc
}, {})

const goal = {
  'red': 12,
  'green': 13,
  'blue' : 14
}

const viableGames = Object.keys(gamesData).filter(key => {
  return !(['red', 'blue', 'green'].some(color => gamesData[key][color] > goal[color]))
})

// Part 1
console.log(viableGames.reduce((acc, game) => (acc + parseInt(game)), 0))

// Part 2
console.log(Object.keys(gamesData).reduce((acc, gameKey) => {
  return acc + (parseInt(gamesData[gameKey].red) * parseInt(gamesData[gameKey].blue) * parseInt(gamesData[gameKey].green))
}, 0))
