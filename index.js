const express = require('express');
const app = express()
const routes = require('./routes/api');
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/', routes);

app.listen(port, () => {console.log(`Server listening @ http://localhost:${port}`)});
