const express = require('express')
const router = express.Router()
const {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
} = require('../../controllers/employeesController')
const verifyJWT = require('../../middleware/verifyJWT')

router.route('/')
    .get(verifyJWT, getAllEmployees)
    .post(createNewEmployee)
    .put(updateEmployee)
    .delete(deleteEmployee)

router.route('/:id')
    .get(getEmployee)

module.exports = router