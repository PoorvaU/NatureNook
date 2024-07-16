const express = require('express');
const router = express.Router({ mergeParams: true });
const Campground = require('../models/campground');

const reviews = require('../controllers/review');
const{validateReview,isLoggedIn,isReviewAuthor} = require('../middleware')
const catchAsync = require('../utils/catchAsync');


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))


module.exports = router;