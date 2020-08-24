// För att starta: npm run dev
const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes');
app.use(express.json());
app.use(routes);
app.use(express.static(__dirname));

app.listen(port, () => {
    console.log(`Vår server lyssnar nu på http://127.0.0.1:${port}/`);
});