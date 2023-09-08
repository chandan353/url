const express = require("express")
const ShortUrl = require('../models/shortUrl')
const router = express.Router()

router.get('/',async(req, res, next) => {
  const shortUrls = await ShortUrl.find()
  res.render("url",{shortUrls:shortUrls })
})
router.post('/shortUrls',async(req,res) => {
  await ShortUrl.create({full: req.body.fullurl })
  res.redirect('/url')
})
router.get('/:shortUrl',async(req,res) =>{
  const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)
  
  shortUrl.clicks++
  shortUrl.save()

  res.redirect(shortUrl.full)
});

module.exports = router;