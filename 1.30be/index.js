const express= require("express")
const app= express();
const port= 8000;
const cors = require("cors")
const fs= require("fs")
const {json} = require("body-parser")
const uuid=require("uuid")

app.use(cors())
app.use(json())

const file = "./data/users.json";
const uniqueRandomID = uuid.v4()

app.post("/user",(req,res)=>{
    const body = req.body
    console.log(req.body)

    fs.readFile(file,"utf-8",(readErr,data)=>{
        if(readErr){
            res.json({status:"false",message: readErr})
        }

        const obj =data? JSON.parse(data):[]

        const newUser = {
            id:uniqueRandomID,
            name:"Bold"
        }

        obj.push(newUser)

        fs.writeFile(file,JSON.stringify(obj),(err)=>{
            if(err){
                res.json({status:"false",message:err})
            }

            res.json({status:true,result:obj})
        })
    })
})

app.get("/user",(req,res)=>{
    fs.readFile(file,"utf-8",(readErr,data)=>{
        if(readErr){
            res.json({status:"false",message: readErr})
        }

        const obj =data? JSON.parse(data):[]
        res.json({status:true,result:obj})
    })
})

app.delete("/user/:id",(req,res)=>{

    const {id} = req.params;
    fs.readFile(file,"utf-8",(readErr,data)=>{
        if(readErr){
            res.json({status:"false",message: readErr})
        }

        const obj =data? JSON.parse(data):[]
       const newArr= obj.filter((e)=>{

           return e.id != id
        })

        fs.writeFile(file,JSON.stringify(newArr),(err)=>{
            if(err){
                res.json({status:"false",message:err})
            }

            res.json({status:true,result:newArr})
        })

        res.json({status:true,result:newArr})
    })
})

app.listen(port,()=>{
    console.log("Server is running on" + port);
})