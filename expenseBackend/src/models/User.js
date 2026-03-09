
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        // Optional by default, but we'll include it per your plan
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});
userSchema.pre('save', async function () {
    console.log('PRE-SAVE HOOK STARTED')
    console.log('Password modified?', this.isModified('password'))

    if (!this.isModified('password')) {
        console.log('Password not modified, skipping hash')
        return;
    }

    try {
        console.log('Hashing password...')
        const salt = await bcrypt.genSalt(10);
        console.log('Salt generated')
        this.password = await bcrypt.hash(this.password, salt);
        console.log('Password hashed successfully')
    } catch (err) {
        console.log('Error in pre-save hook:', err)
        throw err; // Throw instead of calling next
    }
});

module.exports = mongoose.model("User", userSchema);