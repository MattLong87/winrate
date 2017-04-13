const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
//using ES6 promises instead of mongoose's
mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');
const {User} = require('./models/models');

const apiRouter = require('./routes/apiRouter')

//Middleware
app.use(morgan('common'));
app.use(express.static('public'));

app.use('/api', apiRouter);


//Starting and stopping server
//allows both runServer and closeServer to access server object
let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT){
	return new Promise((resolve, reject) => {
		mongoose.connect(databaseUrl, err => {
			if(err){
				return reject(err);
			}
			server = app.listen(port, () => {
				console.log(`App is listening on port ${port}`);
				resolve();
			})
			.on('error', err => {
				mongoose.disconnect();
				reject(err);
			});
		});
	});
}

function closeServer() {
	return mongoose.disconnect().then(() => {
		return new Promise((resolve, reject) => {
			console.log('Closing server');
			server.close(err => {
				if (err) {
					return reject(err);
				}
				resolve();
			});
		});
	});
}

//starts server if server.js is ran via node, 
//but also lets us call runServer() before each test
if (require.main === module){
	runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};