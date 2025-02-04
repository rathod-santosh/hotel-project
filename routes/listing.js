const express=require("express");
const router=express.Router();

const wrapAsync=require("../utils/wrapAsyc.js");

const Listing = require("../models/listing.js");

const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");

const listingController=require("../controllers/listings.js")

const multer=require('multer');
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});


router.route("/")
.get(wrapAsync(listingController.index))
.post(
  isLoggedIn,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.createListing)
);


router.route("/")
  .get(wrapAsync(listingController.index)) // ✅ Handles listing + search
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );


// // New Route
router.get("/new", isLoggedIn,listingController.renderNewForm);




  

//show
router.route("/:id")
.get(wrapAsync(listingController.showListing ))
.put(
  
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updateListing)
)
.delete( isLoggedIn, isOwner,wrapAsync(listingController.destroyListing));



  //Edit Route
  router.get("/:id/edit",
    isLoggedIn,
     isOwner,
     wrapAsync(listingController.renderEditForm) );


     router.get('/listings', async (req, res) => {
      try {
        // Fetch all bookings for the listings
        const bookings = await Booking.find();
    
        // If bookings exist, extract the check-in dates
        const bookedDates = bookings.map(booking => booking.checkIn);
    
        // Log the bookedDates to ensure it's populated
        console.log(bookedDates);  // Ensure this is an array and populated
    
        // Render the listings page and pass bookedDates
        res.render('listings/index', { bookedDates });
    
      } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
      }
    });
    

    
    
    



module.exports = router;



