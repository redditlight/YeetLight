const express = require('express');
const yeelightController = require('./YeelightController');
const redditController = require('./RedditController');

const router = express.Router();

router.route('/initialize').get(yeelightController.initializeYeelight);
router.route('/toggle').get(yeelightController.toggleYeelight);

router.route('/auth').post(redditController.auth);
router.route('/subreddits').post(redditController.subreddits);
router.route('/test').post(redditController.test);

module.exports = router;