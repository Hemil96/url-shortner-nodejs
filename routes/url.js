const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

// Model
const Url = require('../models/Url');

// @route     POST /api/url/shorten
// @desc      Create short URL
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;  
  const baseUrl = config.get('baseUrl');

	// Check based URL
	if (!validUrl.isUri(baseUrl)) {
		return req.status(401).send({error: "Invalid base url"});
	}

	// Create url code
	const urlCode = shortid.generate();

	// Check long URL
	if (validUrl.isUri(longUrl)) {
		try {
			let url = await Url.findOne({ longUrl });

			if (url) {
				return res.status(200).send({data: url})
			} else {
				const shortUrl = baseUrl + '/' + urlCode;

				url = new Url({
					longUrl,
					shortUrl,
					urlCode,
					data: new Date()
				});
				await url.save();
				return res.status(200).send({data: url});
			}

		} catch (error) {
			 console.error(error);
			 return res.status(500).send({error: "Internal Server Error", data: error.message})
		}
	} else {
		res.status(401).send({'error': 'Invalid long url'})
	}
});

module.exports = router;