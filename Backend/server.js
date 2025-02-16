const bodyparser  = require('body-parser');
const cors = require('cors');

const db = require("./src/config/db.js");

const express = require('express');
const app = express();
app.use(bodyparser.json());
app.use(cors());
require('dotenv').config();
 
const port = process.env.port || 8000;

app.listen(port,()=>{
    console.log("localhost:"+port);
})

app.get('/studentmark',(req,res)=>{
    const sql = 'select * from studentmark';

    db.query(sql,(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).json({error:"failes to fetch marks"});
        }
        return res.status(200).json({marks:result});
        
    })
})
//=====================================================================================================================

app.delete('/update-mark/:name',(req,res)=>{
    const { name } = req.params;
    const sql = 'DELETE FROM studentmark WHERE name = ?';

    db.query(sql,[name], (err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).json({error:"failes to delete marks"});
        }
        return res.status(200).json({marks:result});
        
    })
})
//=====================================================================================================================

app.put('/update-mark/:name',(req,res)=>{
    const { name } = req.params;
    const {Name,s1,s2,s3,s4,s5} = req.body

    const sql = `UPDATE studentmark SET name=?,english=?,tamil=?,maths=?,physics=?,chemistry=? where name=?`
db.query(sql,[Name,s1,s2,s3,s4,s5, name],(err)=>{
    if(err){
        console.log(err);
        console.log("id",name)
        console.log("put request failed:", Name,s1,s2,s3,s4,s5);
        return res.status(500).json({err:"failed to add data"});
    }
    else{
        console.log("id",name)
        console.log("put request successful", Name,s1,s2,s3,s4,s5);
    }
    return res.status(200).json({message:"marks added successfuly"});
    
})
})

app.post('/update-mark',(req,res)=>{
    const {Name,s1,s2,s3,s4,s5} = req.body

    const sql = `insert into studentmark (name,english,tamil,maths,physics,chemistry)
values(?,?,?,?,?,?)`
db.query(sql,[Name,s1,s2,s3,s4,s5],(err)=>{
    if(err){
        console.log(err);
        return res.status(500).json({err:"failed to add data"});
    }
    return res.status(200).json({message:"marks added successfuly"});
})
})