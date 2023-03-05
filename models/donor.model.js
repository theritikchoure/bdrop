const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config/config');

const donorSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null,
        required: false,
    },
    blood_group:{
        type: String,
        default: null,
        required: false,
        enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', null]
    },
    mobile: {
        type: Number,
        required: [true, "Please Enter Your Mobile Number"],
        unique: true,
    },
    age: {
        type: Number,
        min: 18,
        max: 65,
        default: null,
        required: false,
    },
    address: {
        type: String,
        default: null,
        required: false,
    },
    city: {
        type: String,
        default: null,
        required: false,
    },
    state: {
        type: String,
        default: null,
        required: false,
    },
    zip_code: {
        type: String,
        default: null,
        required: false,
    },
    confirmedBy: [
        {
            patient: {
                default: null,
                type: mongoose.Schema.ObjectId,
                ref: 'Patient'
            },
            name: {
                type: String,
                required: true
            },
            disease: {
                type: String,
                required: true
            },
        }
    ],
    status: {
        type: String,
        default: "available"
    },
    donated_at: {
        type: String,
        default: null
    },
    donated_tp: [
        {
            patient: {
                default: null,
                type: mongoose.Schema.ObjectId,
                ref: 'Patient'
            },
            name: {
                type: String,
                required: true
            },
            disease: {
                type: String,
                required: true
            },
        }
    ],
    reviews: [
        {
            patient: {
                type: mongoose.Schema.ObjectId,
                ref: "Patient",
                required: true,
            },
            name: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    
    mobileOtp: String,
    mobileOtpExpire: Date,

    user_type: {
        type: String,
        required: false,
        default: 'donor',
    },

    location: {
        type: {
            type: String,
            default: 'Point',
            required: false,
        },
        address: {
            type: String,
            default: null,
            required: false,
        },
        coordinates: []
    },

    is_profile_completed: {
        type: Boolean,
        default: false,
        required: false,
    },
})

donorSchema.pre("save", async function(next){
   
});

// JWT Token
donorSchema.methods.toAuthJSON = function (){
    return {
        id: this._id,
        name: this.name,
        status: this.status,
        user_type: this.user_type,
        is_profile_completed: this.is_profile_completed,
    }
};

// JWT Token
donorSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id}, config.jwtSecret,{
        expiresIn: config.jwtExpire
    });
};

// Checking Donor Availability Status
donorSchema.methods.checkAvailabilityStatus = async function(donor){
    const nextDonationDate = new Date(donor.donatedAt.getTime() + 90 * 24 * 60 * 60 * 1000);
    const currentDate = new Date(Date.now());

    if(currentDate > nextDonationDate )
    {
        donor.status = "available";
        await donor.save({validateBeforeSave:false});
    }
}

module.exports = mongoose.model('Donor', donorSchema);
