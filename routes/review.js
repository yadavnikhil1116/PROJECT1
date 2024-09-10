const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require('../utils/wrapAsync.js');
const cookieParser = require('cookie-parser');
const {validateReviews, isLoggedIn, isReviewAuthor} = require('../middleware.js');
const reviewController = require('../controllers/reviews.js');

//Post review route
router.post('/', isLoggedIn, validateReviews, wrapAsync(reviewController.createReview));

//delete review route
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;