const express= require('express')
const app = express()
const courses = require('./courses')
const validate = require('./validation')

app.use(express.json())

console.log(courses)
app.get('/', (req,res)=>{
    res.send("Hello World!")
})

app.get('/api/courses',(req,res)=>{
    res.send(courses)
})
app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=>c.id===parseInt( req.params.id ));
    if (!course) res.status(404).send('404 not found')
    console.log(typeof(course))
    res.send(course)
})

app.post('/api/courses',(req,res)=>{
    const course= {
        id:req.body.id,
        course:req.body.course
    }
    const result = validate(course)
    if (!result.error){
        courses.push(course)
        res.send(courses)
    }
    else{
        res.send(result.error.details[0].message)
    }
    
})

app.put('/api/courses/',(req,res)=>{
    const course = courses.find(c=>c.id === parseInt(req.body.id))
    if(!course) return res.status(404).send("this object is not found")
    course.course=req.body.course;
    res.send(courses)
    

})


app.delete('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=>c.id===parseInt( req.params.id ));
    if (!course) return res.status(404).send('404 not found')

    //delete
    const index = courses.indexOf(course)
    courses.splice(index,1)
    res.send(courses)
    
})

const port = process.env.PORT||3000;

app.listen(port,()=>console.log(`listening on port ${port}`))