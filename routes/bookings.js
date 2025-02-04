

const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Listing = require('../models/listing');
const { ensureAuthenticated } = require('../xyz/auth');

// Create a booking for a listing
router.post('/:listingId', ensureAuthenticated, async (req, res) => {
  const { checkIn, checkOut } = req.body;
  const listingId = req.params.listingId;

  try {
    // Check if the listing exists
    const listing = await Listing.findById(listingId);
    if (!listing) {
      req.flash('error', 'Listing not found');
      return res.redirect('/listings');
    }

    // Check if check-in and check-out dates are valid
    if (new Date(checkIn) >= new Date(checkOut)) {
      req.flash('error', 'Check-out date must be after check-in date');
      return res.redirect(`/listings/${listingId}`);
    }

    // Create a new booking
    const newBooking = new Booking({
      listing: listingId,
      user: req.user._id, // Assuming `req.user` is populated with the logged-in user
      checkIn,
      checkOut,
    });

    await newBooking.save();

    req.flash('success', 'Booking successful! Check your bookings for details.');
    res.redirect(`/bookings/${newBooking._id}`);
  } catch (error) {
    console.error(error);
    req.flash('error', 'Something went wrong. Please try again.');
    res.redirect(`/listings/${listingId}`);
  }
});

// Show booking confirmation page (or details of booking)
router.get('/:id', ensureAuthenticated, async (req, res) => {
  const bookingId = req.params.id;
  try {
    const booking = await Booking.findById(bookingId)
      .populate('listing')  // Populate with listing details
      .populate('user');    // Populate with user details

    if (!booking) {
      req.flash('error', 'Booking not found');
      return res.redirect('/listings');
    }

    res.render('bookings/show', { booking });
  } catch (error) {
    console.error(error);
    req.flash('error', 'Server error. Please try again.');
    res.redirect('/listings');
  }
});






module.exports = router;
