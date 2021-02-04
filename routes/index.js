const express = require('express');
const router = express.Router();

// Model
const Url = require('../models/Url');

// @route     GET /:code
// @desc      Redirect to long/original URL
router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).send({error: "No URL Found"});
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({error: "Internal Server Error", data: err});
  }
});

module.exports = router;