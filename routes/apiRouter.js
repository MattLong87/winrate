const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/dashboard-info', (req, res) => {
	res.json("dashboard info");
})


module.exports = router;