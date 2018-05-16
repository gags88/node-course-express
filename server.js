const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
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

/*app.use((req, res, next) => {
  res.render('maintenance.hbs');
})*/

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

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})

/* 1. Githib SSH "ssh-keygen -t rsa -b 4096 -C 'dev.gagandeepsharma@gmail.com'"
2. Start SSH Agent eval "$(ssh-agent -s)"
3. Make sure to Add Identity ssh-add ~/.ssh/id_rsa
4. https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the -ssh-agent/
5. Check if SSH has been setup -> ssh -T git@github.com */

/* HEROKU
  1. Signup on heroku and install heroku CLI
  2. Login to local machine `heroku login`
  3. Add SSH key to heroku: `heroku keys:add`
  4. List your keys: `heroku keys`
  5. Test connection with heroku: `ssh -v git@heroku.com`
  6. Update package json file with "start" script as heroku will run this
  7. Update `port` in server.js as herku wll take it from environment variable
  8. Create heroku app: `heroku create` [This will also add new remote to git repo which will point to herolu reg]
  9. Push qpp to heroku: `git push heroku`
  10. Open Heroku app: `heroku open`
 */