const logEvents = require(`${__dirname}/logEvents`)

const EventEmitter = require('events')

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter()

myEmitter.on('log', (msg) => {
    logEvents(msg)
})

setTimeout(() => {
    myEmitter.emit('log', 'Log event emitted!')
}, 2000)