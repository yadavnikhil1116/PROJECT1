const Listing = require('../models/listing.js');

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', {allListings});
}

module.exports.renderNewForm = (req, res) => {
    res.render('listings/new.ejs');
}

module.exports.createNewListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success", "New Listing Created!!");
    res.redirect('/listings');
}

module.exports.renderEditForm = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if(!listing){
        req.flash('error', 'Sorry!!! Listing is not Present!!!');
        res.redirect('/listings');
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render('listings/edit.ejs', {listing, originalImageUrl});
}

module.exports.EditListing = async (req, res) =>{
    let listing = await Listing.findByIdAndUpdate(req.params.id, {...req.body.listing}, {runValidators: true, new: true});
    if(typeof req.file !== 'undefined'){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    }
    req.flash("success", "Listing Updated Successfully!!");
    res.redirect(`/listings/${req.params.id}`);
}

module.exports.destroyListing = async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    req.flash("success", "Listing Deleted Successfully!!");
    res.redirect('/listings');
}

module.exports.showListing = async (req, res) => {
    let id = req.params.id;
    const listing = await Listing.findById(id).populate({path : 'reviews', populate: {path: 'author'}}).populate("owner");
    if(!listing){
        req.flash('error', 'Sorry!!! Listing is not Present!!!');
        res.redirect('/listings');
    }
    console.log(listing);
    res.render('listings/show.ejs', {listing});
}