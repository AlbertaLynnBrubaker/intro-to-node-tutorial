// PRE-MONGO
// const usersDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data) { this.users = data }
// }
// const fsPromises = require('fs').promises
// const path = require('path')
const User = require('../model/User')

const handleLogout = async (req, res) => {
    // On client, also delete the accessToken on the front end
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) // No content
    const refreshToken = cookies.jwt

    // Is refresh token in db?
    // PRE-MONGO
    // const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken)
    const foundUser = await User.findOne({ refreshToken }).exec()
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' }) // in production we will want the secure: true
        return res.sendStatus(204)
    }
    // at this point we have both a user with a refreshToken and and cookie
    // PRE-MONGO
    // const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken)
    // const currentUser = { ...foundUser, refreshToken: '' }
    // usersDB.setUsers([...otherUsers, currentUser])
    // await fsPromises.writeFile(
    //     path.join(__dirname, '..', 'model', 'users.json'),
    //     JSON.stringify(usersDB.users)
    // )
    const result = await User.findOneAndUpdate({ username: foundUser.username }, { refreshToken: '' }).exec()

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' }) // in production we will want the secure: true
    res.sendStatus(204)
}

module.exports = { handleLogout }