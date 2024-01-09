const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
require('dotenv').config()
const fsPromises = require('fs').promises
const path = require('path')

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body
    if (!user || !pwd) res.status(400).json({ "message": "Username and password are required!" })
    const foundUser = usersDB.users.find(person => person.username === user)
    if (!foundUser) return res.sendStatus(401)
    // evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password)
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            // we dont want to pass in any passwords here as this info would be publicly available to anyone able to intercept the jwt
            { "username": foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        )
        const refreshToken = jwt.sign(
            // we dont want to pass in any passwords here as this info would be publicly available to anyone able to intercept the jwt
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )
        // Saving refreshToken with current user to db
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username)
        const currentUser = { ...foundUser, refreshToken }
        usersDB.setUsers([...otherUsers, currentUser])
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        )
        // the best place to store tokens of any kind is in memory. LocalStorage is vulnerable to malefactors and shouldn't be used. We know we need to store the refresh token SOMEWHERE so we will do it in our db using a cookie. Now cookies are also able to be intercepted by people who use javascript but they will not be able to use JS on an http-only cookie, which is what we will use.
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        res.json({ accessToken })
    } else {
        res.sendStatus(401)
    }
}

module.exports = { handleLogin }