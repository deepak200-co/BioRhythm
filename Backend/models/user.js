const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    dob : {
        type: String,
        default: ''
    },
    isFirst : {
        type: Boolean,
        default: true
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User