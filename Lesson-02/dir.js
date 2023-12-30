const fs = require('fs')


if (!fs.existsSync(`${__dirname}/new`)) {
    fs.mkdir(`${__dirname}/new`, (err) => {
        if (err) throw err
        console.log('Directory created')
    })
}

if (fs.existsSync(`${__dirname}/new`)) {
    fs.rmdir(`${__dirname}/new`, (err) => {
        if (err) throw err
        console.log('Directory removed')
    })
}


