const router = require('express').Router();
const Quote = require('../models/quotes.model');

router.route('/').post(async(req, res) => {
    const {quote} = req.body;
    const {id} = req.body;
    const newQuote =  new Quote ({id,quote})
    await newQuote.save();
    res.send(newQuote)
}).get(async (req,res)=>{
    const quote = await Quote.find();
    res.send(quote);
}).delete(async (req,res)=>{
    const {id} = req.body;
    await Quote.deleteOne({id});
    res.send({"ok":"true"});
}).put(async(req,res)=>{
    const {id,quote} = req.body;
    const newQuote =  await Quote.findOne ({id},)
    newQuote.quote=quote;
    await newQuote.save();
    res.send(newQuote);
})
module.exports=router;
