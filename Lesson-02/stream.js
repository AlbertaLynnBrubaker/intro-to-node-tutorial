const fs = require('fs')

const rs = fs.createReadStream(`${__dirname}/files/lorem.txt`, { encoding: 'utf8' })

const ws = fs.createWriteStream(`${__dirname}/files/new-lorem.txt`)

// rs.on('data', (dataChunk) => {
//     ws.write(dataChunk)
// })

// a more efficient option would be using a pipe
rs.pipe(ws)

