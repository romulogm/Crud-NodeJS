const sequelize = require('sequelize');
const database = require('../db');

const programmer = database.define( 'programmer', {
id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
},    
name: {
    type: sequelize.STRING,
    allowNull: false,
},
python: { 
    type: sequelize.BOOLEAN,
    allowNull: false,
},
javascript: { 
    type: sequelize.BOOLEAN,
    allowNull: false,
},
java: { 
    type: sequelize.BOOLEAN,
    allowNull: false,
}
});

module.exports = programmer;


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