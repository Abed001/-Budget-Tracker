const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category name is required'],
        trim: true
    },
    type: {
        type: String,
        required: [true, 'Category type is required'],
        enum: ['income', 'expense'],  // 👈 Only allows these two values
        lowercase: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
        index: true  // 👈 For faster queries
    }
}, {
    timestamps: true  // 👈 Adds createdAt and updatedAt
});

// 👈 Ensure each user has unique category names per type
categorySchema.index({ name: 1, type: 1, userId: 1 }, { unique: true });

// Format output
categorySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Category', categorySchema);