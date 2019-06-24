/* 3rd party packages */
const express = require('express');
const favicon = require('express-favicon');
const path = require('path');

/* Initialize server */
const app = express()


app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
 return res.send('pong');
});
app.get('/*', function (req, res, next) {
    const routerPath = req.path;
    if(routerPath.indexOf('api') == -1){
        return res.sendFile(path.join(__dirname, 'build', 'index.html'));
    }
    next()
});
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})