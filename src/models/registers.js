const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Define schema and model for rickshaw driver data
const driverSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phoneNumber: String,
    licensePlate: String,
    aadharCard: String,
    password: String
});

driverSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

const Driver = mongoose.model('Driver', driverSchema);

// Define schema and model for rider data
const riderSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phoneNumber: String,
    password: String
    
});

riderSchema.pre('save',async function(next)
{
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

const Rider = mongoose.model('Rider', riderSchema);

// RideRequestSchema

const RideRequestSchema = new mongoose.Schema({
    // rider: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true
    // },
    ridername: {
    type: String,
      required: true
    },
    currentLocation: {
      type: String,
      required: true
    },
    destination: {
      type: String,
      required: true
    },
    // timestamp: {
    //   type: Date,
    //   default: Date.now
    // },
    // status: {
    //   type: String,
    //   enum: ['pending', 'accepted', 'completed', 'cancelled'],
    //   default: 'pending'
    // }
  });
  
  const RideRequest = mongoose.model('RideRequest', RideRequestSchema);
  
module.exports = { Driver, Rider, RideRequest };

