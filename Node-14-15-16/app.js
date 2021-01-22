const express = require('express');
const mongo = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = mongo.MongoClient;

mongourl = "mongodb+srv://pratik:pratik@cluster0.996mo.mongodb.net/edunov?retryWrites=true&w=majority";
let db;
let col_name = "users";

const app = express();
const port = process.env.PORT || 9800;

app.use(cors());
//encode data while insert 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());




app.get('/',(req,res)=>{
    res.status(200).send('Health ok');
});

// Show users
app.get('/showUsers',(req,res)=>{
    db.collection(col_name).find().toArray((err,result)=>{
        res.status(200).send(result);
    })
})

// Create user
app.post('/createUser',(req,res)=>{
    db.collection(col_name).insertOne(req.body,(err,result)=>{
        if(err) throw err;
        res.status(200).send('User created');
    });
});

// Update user
app.put('/updateUser',(req,res)=>{
    var id = mongo.ObjectID(req.body._id);
    db.collection(col_name).update({_id:id},
        {
            $set:{
                name:req.body.name,
                city:req.body.city,
                phone:req.body.phone,
                role:req.body.role,
                isActive:req.body.isActive
            }
        },(err,result)=>{
            if(err) throw err;
            res.status(200).send('Data Update');
        }
        );
});



// getUser details
// use param
app.get('/users/:id',(req,res)=>{
    var id = mongo.ObjectID(req.params.id);
    db.collection(col_name).find({_id:id,isActive:true}).toArray((err,result)=>{
        if(err) throw err;
        res.status(200).send(result);
    });
});

// get 
// use query param

app.get('/users',(req,res)=>{
    var query = req.query.city;
    if(req.query.city)
    {
        query ={city:req.query.city,isActive:true};
    }
    else
    {
        query={isActive:true};
    } 
    db.collection(col_name).find(query).toArray((err,result)=>{
        if(err) throw err;
        res.status(200).send(result);
    });
});

// deactivate user

app.put('/deactivateUser',(req,res)=>{
    var id = mongo.ObjectID(req.body._id);
    db.collection(col_name).updateOne({_id:id},
        {
            $set:{
                isActive:false
            }
        },
        (err,result)=>{
            if(err) throw err;
            res.status(200).send('User deactivated');
        })
});




MongoClient.connect(mongourl,(err,conn)=>{
    if(err) throw err;
    db = conn.db('edunov');

    app.listen(port,(err)=>{
        if(err) throw err;
        console.log(`Server is running on port ${port}`);
    });

})

