const mongoose = require('mongoose')
const sarySchema = mongoose.Schema({
    JobPreferences: {
        PreferredCompany: {
            type: String,
            required: true
        },
        PreferredTime: {
            type: String,
            value: [String],
            require: true
        },
        PreferredCity: {
            type: String,
            required: true
        },
        NBHD: {
            type: String,
            require: true
        },
        CoveredAreas: {
            type: String,
            value: [String],
            require: true
        }
    },
    Usage: {
        MobileOS: {
            type: String,
            require: true
        },
        OwnsACar: {
            type: String,
            require: true
        }
    },
    QualiAndExper: {
        MarketingRepEx: {
            type: String,
            required: true,
        },
        EducationalCertificate: {
            type: String,
            required: true,
        },
        GeneralMajor: {
            type: String,
            required: true,
        }
    },
    PersonalInfo: {
        FullName: {
            type: String,
            required: true,
        },
        DateOfBirth: {
            type: String,
            required: true,
        },
        Gender: {
            type: String,
            required: true,
        },
        Nationality: {
            type: String,
            required: true,
        },
    },
    Communicate: {
        Phone: {
            type: String,
            required: true,
            unique: true,
        },
        Email: {
            type: String,
            required: true,
            unique: true,
        },
        RegisteredOnPtway: {
            type: Boolean,
            required: true,
        },
        HearAboutPtway: {
            type: String,
            required: true,
        },
    },
    SubmitDate: {
        type: String,
        required: true
    },


})

module.exports = mongoose.model('Sary', sarySchema)