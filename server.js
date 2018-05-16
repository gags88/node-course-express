const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Custom Middleware
app.use((req, res, next) => {
  const now = new Date().toString();
  const logString = `${now}: ${req.method} ${req.url}`;
  fs.appendFileSync('server.log', `${logString}\n`)
  // Informs express to continue
  next();
})

app.use((req, res, next) => {
  res.render('maintenance.hbs');
  // next();
})

// Express Middleware - inform express to use public directory for views
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})

app.get('/', (req, res) => {
  res.send('Hello')
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {pageTitle: 'About page'});
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
