var express = require('express')
const Kitten = require('./../models/Kitten')
var router = express.Router()

router.get('/', function(req, res, next) {
    let kitten = new Kitten({name: req.query.name})
    kitten.save()
    res.json(kitten)
});
  


module.exports = router;