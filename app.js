
if(process.env.NODE_ENV!=='production'){
    require('dotenv').config()
}
const express = require("express");
const app = express();
const path=require('path');
const port = 5500;
var bodyParser=require('body-parser');
var flash=require('express-flash');
var session=require('express-session');
var router=express.Router();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
const mysql = require('mysql');
const { post } = require('jquery');
const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'db',
multipleStatements: true
})
connection.connect(function(err){
    if(err) throw err;
    console.log('connected');
})


app.use('/static', express.static('static')) // For serving static files
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json());
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}))


// PUG SPECIFIC STUFF
app.set('view engine', 'ejs') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
app.get('/', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'PubG is the best game', "content": con}
    res.status(200).render('login.ejs', params);
})
app.get('/register', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'PubG is the best game', "content": con}
    res.status(200).render('register.ejs', params);
})
app.post('/register', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'PubG is the best game', "content": con}
    res.status(200).render('register.ejs', params);
    var sql="insert into user values(null,'"+req.body.first_name+"','"+req.body.last_name+"','"+req.body.username+"','"+req.body.email+"','"+req.body.dob+"','"+req.body.address+"','"+req.body.city+"','"+req.body.zip+"','"+req.body.contact+"','"+req.body.password+"')";
    connection.query(sql,function(err){
        if(err) throw err
        
    })
})
router.get("#homeSubmenu",function(req,res,next){
    var sql='SELECT * FROM inventory';
    connection.query(sql,function(err,data,fields){
     if(err) throw err;
     res.render('category');
    })
})

app.get('/contact_us', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'PubG is the best game', "content": con}
    res.status(200).render('contactus.ejs', params);
   
})

app.post('/login', (req, res)=>{
    
    var sess=req.session;
    connection.query('Select * from user where uname=? and password=?',[req.body.username,req.body.password],function(error,results,field){
    
        
        if(results.length>0){
        
            res.status(200).render('home.ejs');
        }
        else{
            message='wrong credentials';
            res.status(200).render('login.ejs',{message:message});
           
        }
        
    })
    app.get('/sell', (req, res)=>{
        const con = "This is the best content on the internet so far so use it wisely"
        const params = {'title': 'PubG is the best game', "content": con}
        res.status(200).render('sell.ejs', params);
       
    })
    app.post('/add_item_to_inventory', (req, res)=>{
        const con = "This is the best content on the internet so far so use it wisely"
        const params = {'title': 'PubG is the best game', "content": con}
        var sql="insert into inventory values('"+req.body.item_name+"','"+req.body.item_type+"','"+req.body.item_id+"','"+req.body.quantity+"','"+req.body.item_condition+"','"+req.body.price+"','"+req.body.isbn+"','"+req.body.genre+"','"+req.body.author+"','"+req.body.publisher+"')";
    connection.query(sql,function(err){
        if(err) throw err
        
    })
        res.status(200).render('sell.ejs', params);
       
    })
    connection.query("SELECT * FROM inventory", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      })
    
    
   
})
app.get('/profile', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'PubG is the best game', "content": con}
    res.status(200).render('Profile (1).ejs', params);
})
app.get('/userlist', function(req, res, next) {
    var sql='SELECT * FROM inventory';
    connection.query(sql, function (err, rows, fields) {
    if (err) throw err;
    res.render('category',{ title: 'User List', userData: rows});
  });
  app.get('/wishlist',function(req, res, next){
   
    var l='SELECT * FROM wishlist';
    connection.query(l, function (err, rows, fields) {
        
        if (err) throw err;
        res.render('wishlist',{ title: 'User List', userData: rows});
  

    });
});
app.post('/wishlist_add_item', (req, res,next)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'PubG is the best game', "content": con}
    var sql="insert into wishlist(item_id,item_name) select Id,Name from inventory where Name='"+req.body.item_name+"'";
connection.query(sql,function(err){
    if(err) throw err;
    

    var l='SELECT * FROM wishlist';
    connection.query(l, function (err, rows, fields) {
        
        if (err) throw err;
        res.render('wishlist',{ title: 'User List', userData: rows});
  
    });
});
});
app.get('/cart', (req, res)=>{
   
    var l='SELECT * FROM cart';
    connection.query(l, function (err, rows, fields) {
        
        if (err) throw err;
        res.render('checkout1.ejs',{ title: 'User List', userData: rows});
  

    });
   
})
app.post('/add', (req, res,next)=>{
  
    var sql="insert into cart(Item,Cost) select Name,Price from inventory";
connection.query(sql,function(err){
    if(err) throw err;

    var l='SELECT * FROM cart';
    connection.query(l, function (err, rows, fields) {
        
        if (err) throw err;
        res.render('checkout1.ejs',{ title: 'User List', userData: rows});
  
  
});
});
});

app.post('/email', (req, res)=>{
  const {name,from, subject, text, cb} = req.body;
    const mailOptions = {
        from: from,
        to: 'vimarsh.gupta2019@vitstudent.ac.in',
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });

   
    res.render('contactus',);


});
});
