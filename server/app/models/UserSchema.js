const mongoose = require('mongoose');
const schema = mongoose.Schema;

const user = new schema({
    firstName: { type: String, default: '' },
    lastName: { type: String, default: false },
    email: { type: String, default: false },
    phoneNumber: { type: String, default: false },
    userImage: { type: String, default: false },
    isDeleted:{type:Boolean,default:false}
}, {
    timestamps: true,
    versionKey: false
});

const User = mongoose.model('User', user);

module.exports = { User }