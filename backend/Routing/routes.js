const express = require('express');
const yeelightController = require('./YeelightController');
const redditController = require('./RedditController');

const router = express.Router();

router.route('/initialize').get(yeelightController.initializeYeelight);
router.route('/toggle').get(yeelightController.toggleYeelight);
router.route('/brightness').post(yeelightController.changeBrightness);
router.route('/on').get(yeelightController.turnOn);
router.route('/off').get(yeelightController.turnOff);


router.route('/auth').post(redditController.auth);
router.route('/subreddits').post(redditController.subreddits);
router.route('/karma').post(redditController.karma);
router.route('/test').post(redditController.test);
router.route('/inbox').post(redditController.inbox);

module.exports = router;