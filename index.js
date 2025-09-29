const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());


app.use('/public', express.static(process.cwd() + '/public'));
app.use('/pictures', express.static(process.cwd() + '/pictures'));


app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/views/index.html');
})

app.get('/contact', (req,res)=>{
    res.sendFile(__dirname + '/views/contact.html');
})
app.get('/product', (req,res)=>{
    res.sendFile(__dirname + '/views/productpage.html');
})
app.get('/res', (req,res)=>{
    res.sendFile(__dirname + '/views/resturnt.html');
})
app.get('/about', (req,res)=>{
    res.sendFile(__dirname + '/views/about.html');
})
app.get('/gallery', (req,res)=>{
    res.sendFile(__dirname + '/views/gallery.html');
})
app.get('/catering', (req,res)=>{
    res.sendFile(__dirname + '/views/catering.html');
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});