const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const {validateListings, isLoggedIn, isOwner} = require('../middleware.js');
const listingController = require('../controllers/listings.js');
const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });

router.route("/")
    .get(wrapAsync(listingController.index))  //index route
    .post(isLoggedIn, upload.single('listing[image]'), validateListings, wrapAsync(listingController.createNewListing));   //create route

router.get('/new', isLoggedIn, listingController.renderNewForm);  //renderNewPage route

router.route("/:id")
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListings, wrapAsync(listingController.EditListing))  //edit route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing))   //delete route
    .get(wrapAsync(listingController.showListing));  //show route

router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));  //renderEditPage route

module.exports = router;