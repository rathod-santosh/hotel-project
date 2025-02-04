const Listing=require("../models/listing");


module.exports.index= async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  };

  module.exports.renderNewForm=(req, res) => {
    // console.log(req.user);
    
    res.render("listings/new.ejs");
  };


  module.exports.showListing=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
      path:"reviews",
      populate:{
        path:"author",
      },
    })
    .populate("owner");

    if(!listing){
      req.flash("error","Listing you requested for does not exists!");
      res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
  };


  module.exports.createListing=async (req, res, next) => {
        // No need to call listingSchema.validate(req.body) here
        let url=req.file.path;
        let filename=req.file.filename;
       
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image={url,filename};
        await newListing.save();
        
        req.flash("sucess", "New Listing Created!");
        res.redirect("/listings");
      };


    module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;

    if (originalImageUrl) {
        originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250,h_250,c_fill");
        console.log("Transformed Image URL:", originalImageUrl);
    } else {
        originalImageUrl = "https://via.placeholder.com/250"; // Fallback image
    }

    res.render("listings/edit.ejs", { listing, originalImageUrl });
};


    module.exports.updateListing=async (req, res) => {
        if (!req.body.listing) {
          throw new ExpressError(400, "Send valid data for listing");
        }
    
        let { id } = req.params;
       let listing= await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        
if(typeof req.file !== "undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename}; 
        await listing.save();
}
        req.flash("success", "Listing Updated!");
        res.redirect(`/listings/${id}`);
      };
    

    module.exports.destroyListing= async (req, res) => {
      let { id } = req.params;
      let deletedListing = await Listing.findByIdAndDelete(id);
    
      req.flash("success", "Listing Deleted!");
      res.redirect("/listings");
    };

    
//search



module.exports.index = async (req, res) => {
  try {
      console.log("Query parameters:", req.query); // Log query parameters to see what is being passed
      const { location } = req.query; // Get location query parameter
      let filter = {};

      if (location) {
          filter.location = { $regex: location, $options: "i" }; // Case-insensitive search for location
      }

      const allListings = await Listing.find(filter); // Apply the filter to the listings

      res.render("listings/index.ejs", { allListings, location: location || "" });
  } catch (error) {
      console.error(error);
      req.flash("error", "Something went wrong.");
      res.redirect("/listings");
  }
};
