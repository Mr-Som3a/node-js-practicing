const Joi =require('joi')
const schema = Joi.object({
    id:Joi.number().required(),
    course:Joi.string().min(2).required("must enter a course name")
})


function validation(item){
    return schema.validate(item)     
}

module.exports=validation