const express = require('express');
const bodyParser = require('body-parser');
const programmer = require('./database/tables/programmer');

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname});
});

app.get('/syncDatabase', async (req, res) => {
  const database = require('./database/db');
  try {
    await database.sync();
    res.send(`Database succesfully sync'ed`);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});

//create

app.post('/createProgrammer', async (req, res) => {
    try {
      const params = req.body;
      const properties = ['name', 'python', 'java', 'javascript'];
      const check = properties.every((property) => {
        return property in params;
      });
      if (!check) {
        const propStr = properties.join(', ');
        res.send(`All parameters needed to create a programmer must be sent: ${propStr}`);
        return;
      }
   
      const newProgrammer = await programmer.create({
        name: params.name,
        python: params.python,
        javascript: params.javascript,
        java: params.java
      });
   
      res.send(newProgrammer);
    } catch (error) {
      res.send(error);
    }
  });
