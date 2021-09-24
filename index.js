const express = require('express');
const app = express()
const port = process.env.PORT || 5000;

app.get('/api', (req, res) => {
    res.send('Hello World');
})

app.post('/api', (req, res) => {
    res.send('Got a POST request')
})


app.listen(port, () => {console.log(`Server listening @ http://localhost:${port}`)})
