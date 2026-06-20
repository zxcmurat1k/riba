const express = require('express');
const path = require('path');

const contactRoutes = require('./src/routes/contact.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// статика (сайт)
app.use(express.static(__dirname));

// API
app.use('/api', contactRoutes);

app.listen(3000, () => {
    console.log('http://localhost:3000');
});