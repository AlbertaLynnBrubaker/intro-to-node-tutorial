// PRE-MONGODB
// const usersDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data) { this.users = data }
// }
// const fsPromises = require('fs').promises
// const path = require('path')
const User = require('../model/User')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' })
    
    // PRE-MONGODB
    // const foundUser = usersDB.users.find(person => person.username === user)
    const foundUser = await User.findOne({ username: user }).exec()

    if (!foundUser) return res.sendStatus(401) //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password)
    if (match) {
        const roles = Object.values(foundUser.roles)
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '5m' }
        )
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )
        // Saving refreshToken with current user

        // PRE-MONGODB
        // const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username)
        // const currentUser = { ...foundUser, refreshToken }
        // usersDB.setUsers([...otherUsers, currentUser])
        // await fsPromises.writeFile(
        //     path.join(__dirname, '..', 'model', 'users.json'),
        //     JSON.stringify(usersDB.users)
        // )

        // maybe  ??? 
        const result = await User.findOneAndUpdate({ username: user }, { refreshToken: refreshToken } ).exec()

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }) // in production we will want the secure: true
        res.json({ accessToken })
    } else {
        res.sendStatus(401)
    }
}

module.exports = { handleLogin }