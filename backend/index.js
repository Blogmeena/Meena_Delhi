const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const mysql=require('mysql2');
const app=express();
app.use(cors());
app.use(bodyparser.json());
//connect MySQL database
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'userinfo',
    port:3306

});
//check database connection
db.connect(err=>{
    if(err){
        console.log('err')
    }else{

    console.log('database connected successfull');
    }
})
//get all data from database
app.get('/user',(req,res)=>{
    console.log('get all users');
    let arr='SELECT * FROM user';
    db.query(arr,(err,results)=>{
        if(err){
            console.log(err,'errs');
        }
        if(results.length>0){
            res.send({
                message:'All users Data',
                data:results

            });
        };
    })

})
//get single data by id
app.get('/user/:Id',(req,res)=>{
    console.log('get data by id');
    console.log(req.params.Id);
    let qrId=req.params.Id;
    let qr="SELECT * FROM user WHERE Id="+ mysql.escape(qrId);
    db.query(qr,(err,results)=>{
        if(err){
            console.log(err,'errs');
        }
        console.log(results);
        if(results.length>0){
            res.send({
                message:'Get Data by Id',
                data:results

            })
        }else{
            res.send({
                message:"data not found dear!"

        });
    }
    });
});
//create/post data
app.post('/user',(req,res)=>{
    console.log(req.body,'post data success');
    let cfullname=req.body.Fullname;
    let cEmail=req.body.Email;
    let cPhoneno=req.body.Phoneno;
    console.log(cfullname,cEmail,cPhoneno);
    let qr="insert into user(Fullname,Email,Phoneno)values('"+cfullname+"','"+cEmail+"','"+cPhoneno+"')";
    console.log(qr);
    db.query(qr,(err,results)=>{
        if(err){
            console.log(err,'errs');
        }
        res.send({
            message:"data not found dear!",
            data:results

    });
})
})
//update data
app.put('/user/:Id',(req,res)=>{
    console.log(req.body,'post data success');
    uId=req.params.Id;
    console.log(req.params.Id);
    let nfullname=req.body.Fullname;
    let nEmail=req.body.Email;
    let nPhoneno=req.body.Phoneno;
    let qr="update user set Fullname='"+nfullname+"',Email='"+nEmail+"',Phoneno='"+nPhoneno+"' where Id='"+uId+"'";
    console.log(qr);
    db.query(qr,(err,results)=>{
        if(err){
            console.log(err,'errs');
        }
        res.send({
            message:"data updated successfully",
            data:results

    });
})
})
//Delete data
app.delete('/user/:Id',(req,res)=>{
    console.log(req.body,'post data success');
    uId=req.params.Id;
    let qr="delete from user where Id='"+uId+"'";
    db.query(qr,(err,results)=>{
        if(err){
            console.log(err,'errs');
        }
        res.send({
            message:"data Deleted successfully",
            data:results

    });
})
})
app.listen(3000,()=>{
    console.log('server is running on 3000 Port');
})