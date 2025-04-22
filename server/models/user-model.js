const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

userSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    try{
        //generate salt of len 10
        const salt = await bcrypt.genSalt(10);
        //hash password with salt
        const hashPass = await bcrypt.hash(user.password, salt);
        user.password = hashPass;
    }catch(err){
        console.log(err.message);
    }
})



module.exports = mongoose.model('User', userSchema);