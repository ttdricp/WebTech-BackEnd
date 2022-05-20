var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    // name: {
    //     type: String,
    //     required: true,
    // },
    password: {
        type: String,
        required: true,
    },
    // re_pass:  {
    //     type: String,
    //     required: true,
    // },
    root:{
        type: String,
        default:''
    }
});
var user = new mongoose.model('User', schema);
module.exports = user;