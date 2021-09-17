const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
mongoose.connect('mongodb://Username:password@HOSTNAME:NODEPORT', { useNewUrlParser: true, useUnifiedTopology: true },(err => {
    if(err)console.log(err);
    else console.log("success")
}))
const quotesRouter = require('./route/quotes');
app.use('/quote', quotesRouter);
app.listen(3000, () => {
    console.log(`Server is running on port: 3000`);
});
