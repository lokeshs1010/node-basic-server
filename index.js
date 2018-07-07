const express = require('express');

const port = process.env.PORT || 3000;
const hbs = require('hbs');

const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = Date().toString();
    let log = `${now}: ${req.method} ${req.url}`

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    })

    next();
})

// app.use((req, res, next) => {
//     res.render('maintain.hbs');
// })

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt' , (text) => {
    return text.toUpperCase();
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
})

app.get('/', (req,res) => {
    res.render('home.hbs', {
        pageTitle : 'Home Page',
        welcomeMessage : 'Welcome to home page'
    })
})

app.listen(port, () => {
    console.log(`Server is on port ${port}`)
});
