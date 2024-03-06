import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    role: {
        type: Number,
        default: 0,
    },
}, { timestamps: true })

//userSchema schema will be mapped to the collection users  
//a model is basically a collection. While importing this, we will basically get a table(collection) to which we can perform CRUD operations
export default mongoose.model('users', userSchema);