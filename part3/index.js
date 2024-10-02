const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs'); // use to perfrom read and write

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));


app.get('/' , function(req , res){
    fs.readdir('./files' , function(err, files){
        res.render("index" , {files:files});
    })
    
})

//This is for read more 
app.get('/file/:filename' , function(req , res){
   fs.readFile(`./files/${req.params.filename}` , "utf-8" , function(err , filedata){
    res.render('show',{filename: req.params.filename , filedata:filedata});
   })
    
})

//This is for edit._._.
app.get('/edit/:filename' , function(req , res){
   res.render('edit' , {filename:req.params.filename});
})

//On submit name get Updated._._.
app.post('/edit' , function(req , res){
    fs.rename(`./files/${req.body.previous}` , `./files/${req.body.new}` , function(err){
        res.redirect('/');
    })
})

app.post('/create', function(req, res) {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err) { // Fixed path here
        if (err) {
            console.log('Error writing file:', err); // Optional error logging
            return res.status(500).send('An error occurred while creating the task.');
        }
        res.redirect('/');
    });
});



app.listen(3000);