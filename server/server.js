const express = require("express");
const app = express();
const webpack = require('../webpack.config')
const path = require("path");


app.use(express.json())

app.use('/client/',express.static(path.join(__dirname, '../client')));


if (webpack.mode == "production") {
    app.use('/build', express.static(path.join(__dirname, '../build')));
    app.get('/', (req, res) => {
        return res.status(200).sendFile(path.join(__dirname, '../index.html'))
    }) 
}


app.listen(3000, () => {console.log('listening on port 3000')})

//hi