const express= require('express')
const app = express()
const courses = require('./courses')

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
        id:courses.length+1,
        name:req.body.name
    }
    courses.push(course)
    res.send(courses)
})

// app.put('/api/courses/',(req,res)=>{
//     const course= {
//         id:req.body.id,
//         name:req.body.name
//     }
//     const index = course.id;
//     courses.map(c=>c.id===)

// })


app.delete('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=>c.id===parseInt( req.params.id ));
    if (!course) return res.status(404).send('404 not found')

    //delete
    const index = courses.indexOf(course)
    courses.splice(index,2)
    res.send(courses)
    
})

const port = process.env.PORT||3000;

app.listen(port,()=>console.log(`listening on port ${port}`))