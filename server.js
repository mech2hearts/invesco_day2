const express = require('express');
const router = require('router');
const dataset = require('./InvestmentData.json');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const revisedData = JSON.stringify(dataset).replace(/\s/g, '');
var currentData = JSON.parse(revisedData);

app.get('/dataset',(req, res) => {
    res.send(currentData);
})

app.post('/add', (req, res) => {
    currentData = [...currentData, req.body];
    var newData = currentData;
    res.send(newData);
})

app.post('/remove', (req, res) => {
    var newData = [];
    currentData.map( row => {
        if(row.InvestmentId !== req.body.investId){
            newData.push(row);
        }
    })
    currentData = [...currentData, newData];
    res.send(currentData);
})

app.post('/update', (req, res) => {
    var newData = [];
    currentData.map( row => {
        if(row.InvestmentId !== req.body.investId){
            newData.push(row);
        }
    })
    currentData.push(req.body);

    res.send(currentData);
})



const port = process.env.PORT || 5000;

var server = app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = server;