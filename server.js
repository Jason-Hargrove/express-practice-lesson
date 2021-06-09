// load express
const express = require('express');
const app = express();
const fs = require('fs');


app.engine('hypatia', (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    // one line if statement. grabing the call back. if error -->
    if (err) return callback(err)
    // rest of code
    const rendered = content.toString()
    .replace('#title#', `<title>${options.title}</title>`)
    .replace('#message#', '<h1>' + options.message + '</h1>').replace('#content#','<div>'+ options.content + '</div>')

    return callback(null, rendered);
  })
})

app.set('views', './views')
app.set('view engine', 'hypatia')

app.get('/', (req, res) => {
  res.render('template', {title: 'Hey', message: 'Hello there', content: 'I\'m the Boss.'})
})

app.get('/about-me', (req, res) => {
  res.render('template', {title: 'hey', message: 'Rick Ross!', content: 'under rated'})
})

app.get('/another-one', (req, res) => {
  res.render('template', {title: 'We The Best Title', message: 'Who?', content: 'Eh'})
})

app.get('/neet', (req, res) => {
  res.send('I am Neet and i code awesome')
})
app.get('/santos', (req, res) => {
   res.redirect('/neet')
})

app.get('*', (req, res) => {
  res.status(404).render('template' {title: 404, message: 'It\'s not here', content: 'NOT fOuNd'})
})

app.listen(3000, () => console.log('hello i am listening on port 3000'))
