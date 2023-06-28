const express = require('express');
const movieModel  = require("./model/moviesDB")
const cors = require('cors');
/* The line `const path = require('path');` is importing the built-in Node.js module `path`. This
module provides utilities for working with file and directory paths. It is being used in this code
to construct the file path for serving static files and for handling the GET request for any route
that hasn't been matched by the previous routes. */
const path = require('path');

const app = new express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
/* `app.use(express.static(path.join(__dirname,'/build')));` is serving static files from the `/build`
directory. */
app.use(express.static(path.join(__dirname,'/build')));

app.post('/api/addmovie',async(req,res)=>{
    console.log(req.body)
    var data = await movieModel(req.body);
    data.save();
    res.send({status:"Movie Added"})
})

app.get('/api/viewmovie',async(req,res)=>{
    var data = await movieModel.find();
    res.json(data);
    console.log(data)
})

app.delete('/api/deletemovie/:id',async(req,res)=>{
    console.log(req.params)
    let id = req.params.id;
    await movieModel.findByIdAndDelete(id);
    res.json({status:"Movie deleted"})
})

app.put('/api/editmovie/:id',async(req,res)=>{
    let id = req.params.id;
    try{
        await movieModel.findByIdAndUpdate(id, req.body)
        res.json({status:"Movie Updated"})
    } 
    catch(err){
        res.status(500).send(err)
    }
})

/* The `app.get('/*', function(req, res) { res.sendFile(path.join(__dirname, '/build/index.html'));
});` code is handling a GET request for any route that hasn't been matched by the previous routes. */
app.get('/*', function(req, res) { res.sendFile(path.join(__dirname 
    ,'/build/index.html')); });

app.listen(8000,()=>{
    console.log("Port 8000 is up and running")
})