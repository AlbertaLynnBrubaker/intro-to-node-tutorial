// How NodeJS differs from Vanilla JS
// 1) Node runs on a server, not in a browser
// 2) The console is the terminal window
console.log('Hello world!')
const { log } = require('console')
// 3) global object instead of the window object
// console.log(global)
// 4) has Common Core modules that we will explore
// 5) CommonJS modules instead of ES6 modules
// 6) Missing some JS APIs like fetch

const os = require('os')
const path = require('path')
// importing our custom funcitons from math.js
const math = require('./math')
// or destructure our functions for direct calls
const { add, subtract, multiply, divide } = require('./math')

// console.log(os.type())
// console.log(os.version())
// console.log(os.homedir())

// //using os
// console.log(__dirname)
// console.log(__filename)

// // using path
// console.log(path.dirname(__filename))
// console.log(path.basename(__filename))
// console.log(path.extname(__filename))

// console.log(path.parse(__filename))

console.log(add(2, 3))
console.log(subtract(2, 3))
console.log(multiply(2, 3))
console.log(divide(2, 3))