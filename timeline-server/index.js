
const express = require('express');
const mysql = require('mysql2');
const bodyparser = require('body-parser');

const app = express();
const port = 3010;



app.get('/new', (req, res) => {
    res.json({ message: "Hi this is done" });
  });
  



app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})