// PRE-MONGO
// const data = {
//     employees: require('../model/employees.json'),
//     setEmployees: function (data) { this.employees = data }
// }
const Employee = require('../model/Employee')

const getAllEmployees = async (req, res) => {
    // PRE-MONGO
    // res.json(data.employees);
    const employee = await Employee.find({}).exec()
    res.json(employee);
}

const createNewEmployee = async (req, res) => {
    // PRE-MONGO
    // const newEmployee = {
    //     id: data.employees?.length ? data.employees[data.employees.length - 1].id + 1 : 1,
    //     firstname: req.body.firstname,
    //     lastname: req.body.lastname
    // }
    if (!req.body.firstname || !req.body.lastname) {
        return res.status(400).json({ 'message': 'First and last names are required.' })
    }

    const newEmployee = await Employee.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname
    })


    // PRE-MONGO
    // data.setEmployees([...data.employees, newEmployee])

    const employees = await Employee.find({}).exec()
    res.status(201).json(employees)
}

const updateEmployee = async (req, res) => {
    // PRE-MONGO
    // const employee = data.employees.find(emp => emp.id === parseInt(req.body.id))
    console.log(req.body.id)
    const employee = await Employee.findById(req.body.id).exec()
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` })
    }
    if (req.body.firstname) employee.firstname = req.body.firstname
    if (req.body.lastname) employee.lastname = req.body.lastname

    employee.save()

    // PRE-MONGO
    // const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id))
    // const unsortedArray = [...filteredArray, employee]
    // data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    const employees = await Employee.find({}).exec()

    res.json(employees)
}

const deleteEmployee = async (req, res) => {
    // PRE-MONGO
    // const employee = data.employees.find(emp => emp.id === parseInt(req.body.id))
    const employee = await Employee.findOneAndDelete({_id: req.body.id}).exec()
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` })
    }
    // PRE-MONGO
    // const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id))
    // data.setEmployees([...filteredArray])

    const employees = await Employee.find({}).exec()
    res.json(employees)
}

const getEmployee = async (req, res) => {
    // PRE-MONGO
    // const employee = data.employees.find(emp => emp.id === parseInt(req.params.id))
    console.log(req.params)
    const employee = await Employee.findById(req.params.id).exec()
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` })
    }
    res.json(employee)
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}