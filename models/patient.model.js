const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config/config');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null,
        required: false,
    },
    bloodgroup:{
        type: String,
        default: null,
        required: false,
    },
    mobile: {
        type: Number,
        required: [true, "Please Enter Your Mobile Number"],
        unique: true,
    },
    age: {
        type: Number,
        min: 0,
        max: 110,
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
    disease: {
        type: String,
        default: null,
        required: false,
    },
    hospital: {
        type: String,
        default: null,
        required: false,
    },

    mobileOtp: String,
    mobileOtpExpire: Date,

    user_type: {
        type: String,
        required: false,
        default: 'patient',
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
    }
});

module.exports = mongoose.model('Patient', patientSchema);