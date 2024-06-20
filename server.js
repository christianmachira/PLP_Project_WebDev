const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const url = 'mongodb://localhost:27017/PLP_Project';
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
  }); 
MongoClient.connect('mongodb://localhost:27017/PLP_Project', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('contactCards');
    const contactsCollection = db.collection('contacts');

    app.post('/contacts', (req, res) => {
      contactsCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/');
        })
        .catch(error => console.error(error));
    });

    app.listen(3000, function() {
      console.log('listening on 3000');
    });
  })
  .catch(error => console.error(error));
  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    fetch('/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `name=${name}&phone=${phone}&email=${email}&message=${message}`,
    });
  });