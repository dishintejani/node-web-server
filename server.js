const express = require('express');
const hbs = require('hbs');
const fs =require('fs');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now  = new Date().toString();

    let log =`${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n' , (err) => {
        if(err) {
            console.log('Unable to append to server.log file')
        }
    });
   next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + "/public"));

app.get('/', (req,res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Pages',
        welcomeMessage: 'Welcome to the website'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get("/projects", (req, res) => {
  res.render("projects.hbs", {
    pageTitle: "Project Page",
    welcomeMessage: 'My PortFolio'
  });
});

app.get("/bad", (req, res) => {
  res.send({
      status: 404,
      error: 'Page not Found'
  });
});

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});