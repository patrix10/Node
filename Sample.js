const http = require('http')

http.createServer((req,res)=> {
    res.writeHead(200,{'Content-type':'application\json'})
    res.write(JSON.stringify({name:'Pratik Singh',email:'xyz.com'}))
    res.end()
}).listen(4000)

/*we can also create new file for data */


const fs = require('fs')
const inputs = process.argv

fs.writeFileSync(input[2],input[3])

/////////////////

const fs = require('fs')
const input = process.argv

if(input[2]=='add')
{
    fs.writeFileSync(input[3],input[4])
}else if (input[2]=='remove') {
    fs.unlinkSync(input[3])
}else{
    console.log("invalid input")
}


//CRUD

const fs = require('fs')
const path = require('path')
const dirPath = path.join(__dirname,'files')
for(i=0;i<5;i++) 
{//create
    fs.writeFileSync(dirPath+"/hello"+i+".txt","hello world")
}

//read
fs.readdir(dirPath,(err,item) => {
    item.forEach((e)=> {
       console.log(e)
    })
})

//update
const filePath = `${dirPath}/apple.txt`

fs.appendFile(filePath,'How are you',(err)=> {
    if(!err) console.log("file is updated")
})

//rename
fs.rename(filePath,`${dirPath}/fruit.txt`,(err)=> {
    if(!err) console.log("file name is updated")
})

//delete
fs.unlinkSync(`${dirPath}/fruit.txt`)


//Express js
const express = require('express')
const app = express()

app.get('',(req,res)=> {
    res.send('hello this is a home page')
})

app.get('/about',(req,res)=> {
    res.send('hello this is a about page')
})

app.listen(5005)


//query parameter
app.get('/about',(req,res)=> {
    res.send(` <input type="text" placeholder="enter" value="${req.query.name}"`)
})


//html pages
const express = require('express')
const path = require('path')

const apps = express()
const publicPath = path.join(__dirname,'public')

app.get('',(_,res) =>{
    res.sendFile(`${publicPath}/index.html`)
})

app.get('/about',(_,res) =>{
    res.sendFile(`${publicPath}/about.html`)
})
apps.listen(3000)

//error404
app.get('*',(_,res)=>{
    res.sendFile(`${publicPath}/nopage.html`)
})

//template engine
//ejs

//middleware
const express = require('express')
const appp = express()

appp.get('/',(req,res)=> {
    res.send('hello this is a home page')
})

appp.get('/users',(req,res)=> {
    res.send('hello this is a users page')
})

const reqFilter=(req,res,next)=> {
    if(!req.query.age)
    {
        res.send("please provide age")
    }else if(req.query.age<18){
        res.send("you cannot access this page")
    }else{
        next();
    }
}
appp.use(reqFilter)
appp.listen(5000)

//route level middleware
app.get('/users',reqFilter,(req,res)=>{
    res.send('welcome users')
})

//Connect node js with mongodb
const {MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017'
const database = "e-comm"
const client = new MongoClient(url);

async function getData()
{
    let result = await client.connect();
    let db = result.db(database);
    let collection = db.collection('products')
    let response = await collection.find({}).toArray();
    console.log(response);
}

getData();


//Read data from mongodb(Method-1)

dbConnect().then((res)=> {
    res.find().toArray().then((data)=> {
        console.warn(data)
    })
})


//Method-2
const main = async ()=> {
    let data = await dbConnect();
    data = await data.find().toArray();
    console.warn(data)
}

main();


//Insert data from mongodb
const insert = async ()=> {
    const db = await dbConnect();
    const result = await db.insertOne(
        {name:'neymar',skill:'dribbling'}
    );
    console.log(result)
}

insert();

//update data 
const updateData = async () => {
    let data = await dbConnect();
    let result = await data.updateOne(
        {name:'ronaldo'},{
            $set:{name:'cr7'}
        }
    );
    console.warn(result)
}

updateData();

//delete data
const deleteData = async () => {
    let data = await dbConnect();
    let result = await data.deleteOne(
        {name:'neymar'}
    );
    console.warn(result)
}

deleteData();

//get api
// const express = require('express')
// const dbConnect = require('mongodb')
// const app = express()

// app.get('/',async(req,res)=> {
//     let data = await dbConnect()
//     data = await data.find().toArray()
//     res.send(data)
// })

// app.listen(3000)

//post api

app.post('/',async(req,res)=> {
    let data = await dbConnect();
    let result = await data.insert(req.body)
    res.send(result)
})

//put api
app.put('/',async(req,res)=> {
    let data = await dbConnect();
    let result = data.updateOne(
        {name:req.body.name},
        {$set:req.body}
    )
    res.send({result:"update"})
})

//delete api
app.delete('/',async(req,res)=> {
    let data = await dbConnect();
    let result = data.deleteOne({name:req.body.name})
    res.send(result)
})

app.delete('/:id',async(req,res)=> {
    let data = await dbConnect();
    let result =await data.deleteOne({_id:new dbConnect.MongoDBCollectionNamespace.ObjectId(req.params.id)})
    res.send(result)
})


//create using mongoose
const mongoose =require('mongoose')

mongoose.connect("mongodb://localhost:27017/e-comm");

const ProductSchema = new mongoose.Schema({
    name: String,
    skill: String,
    value: Number
});

const mains = async ()=> {
    const Product = mongoose.model('products',ProductSchema)
    let data = new Product({name:"mbappe",skill:"speed",value:200})
    let result = await data.save()
    console.log(result);
}

mains()

//update using mongoose
const updatedb = async ()=> {
    const Product = mongoose.model('products',ProductSchema)
    let data = await Product.updateOne({name:"messi"},
    {
        $set:{skill:'god',name:'goat'}
    }
    )
    console.log(data);
}

updatedb()

//delete using mongoose
const deletedb = async ()=> {
    const Product = mongoose.model('products',ProductSchema)
    let data = await Product.deleteOne({name:"neymar"})
    console.log(data);
}

deletedb()

//find using mongoose
const finddb = async ()=> {
    const Product = mongoose.model('products',ProductSchema)
    let data = await Product.find()
    console.log(data);
}

finddb()

//post api with mongoose
// const express = require('express')
// require('./config')
// const Product = require('./product')

// const app = express()

// app.use(express.json())

// app.post('/create',async(req,res)=>{
//     let data = new Product(req.body)
//     let result = await data.save()
//     res.send(result)
// })

// app.listen(4000,"localhost",()=>{
//     console.log("server: http://localhost:4000")
// })


;;;;

//get api
// const express = require('express')
// require('./config')
// const Product = require('./product')

// const app = express()

// app.use(express.json())

// app.get('/list',async(req,res)=>{
//     let data = new Product.find()
//     res.send(data)
// })

// app.listen(5000,"localhost",()=>{
//     console.log("server: http://localhost:5000/list")
// })

;;;

//delete api
app.delete('/delete/:_id',async(req,res)=>{
    console.log(req.params)
    let data = await Product.deleteOne(req.params)
    res.send(data)
})

//update api
app.put('/update/:_id',async(req,res)=>{
    console.log(req.params)
    let data = await Product.updateeOne(
        req.params,
        {
            $set:req.body
        }
    );
    res.send(data)
})

//search api
app.get('/search/:key',async(req,res)=>{
    console.log(req.params.key)
    let data = await Product.find(
        {
            "$or":[
                {"name":{$regex:req.params.key}},
                {"skill":{$regex:req.params.key}}
            ]
        }
    );
    res.send(data)
})

//upload file in node js (notes)

//os module
const os = require('os')

console.log(os.arch())
console.log(os.hostname())
console.log(os.userInfo())

//event and eventemitter

//repl