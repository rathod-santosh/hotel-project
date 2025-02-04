const Joi = require('joi');
// this is backend schema its handle bakends error

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().min(0).required(),
    image: Joi.string().allow("", null),
  }).required(),
});


// module.exports.reviewSchema=Joi.object({
//   review:Joi.object({
//     rating:Joi.number().required().min(1).max(5),
//     comment:Joi.string().required(),
//   }).required(),
// });
// 
module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
    listing: Joi.string().required(), // Add this line
  }).required(),
});












// const Joi=require('joi');
// // const Listing = require('./models/listing');

//  module.exports.listeningSchema=joi.object({
//     listing: Joi.object({
//         title:Joi.string().required,
//         description:Joi.string().required,
//         location:Joi.string().required,
//         country:Joi.string().required,
//         price:Joi.number().required.min(0),
//         image:Joi.string().allow("",null),
//     }).required(),
// });