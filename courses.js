const express =require('express')
const router = express.Router()
const validation = require('./validation')

const courses =[
    {id:1 ,course:'Js'},
    {id:2 ,course:'css'},
    {id:3 ,course:'React'},
]

router.get(`/`, (req, res) => {
    res.send(courses)
})
router.post(`/`, (req, res) => {
    const course = {
        id: req.body.id,
        course: req.body.course
    }
    const { error } = validation(course)
    if (!error) {
        courses.push(course)
        return res.send(courses)
    }
    res.status(400).send(error.details[0].message)

})
router.put(`/:id`, (req, res) => {
    const course = courses.find(e => e.id === parseInt(req.params.id))
    if (course == null) {
        res.status(404).send('This item is not found')
    } else {
        course.course = req.body.course
        const { error } = validation({ id: req.params.id, course: course.course })
        if (!error) {
            return res.send(course)
        }
        res.status(400).send(error.details[0].message)
    }

})
router.delete(`/:id`, (req, res) => {
    const course= courses.find(e => e.id === parseInt(req.params.id))
    if (course == null) {
        res.status(404).send('This item is not found')
    } else {
        const index = courses.indexOf(course)
        courses.splice(index,1)
        res.send(courses)
    }

})

module.exports = router

