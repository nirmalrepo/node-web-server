const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

const port=process.env.PORT || 3000;

var app=express();

//to add includes views
hbs.registerPartials(__dirname+'/views/partials');

//to use functions inside hbs templates
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});
app.set('view engine','hbs');

//express registere middleware arrange in order


app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}:${req.method} ${req.url}`;

  fs.appendFile('server.log',log+'\n');
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname+'/public'));

//route handler
app.get('/',(req,res)=>{
  // res.send('<h1>hello express!</h1>');
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage:'Welcome Home'
  });
});

app.get('/about',(req,res)=>{

  res.render('about.hbs',{
    pageTitle:'About Page'
  });
});

app.get('/bad',(req,res)=>{
    res.send({
      errorMessage:'Unable to handle request'
    });

});

app.listen(port,()=>{
  console.log(`Server is running on port ${port}`)
});
