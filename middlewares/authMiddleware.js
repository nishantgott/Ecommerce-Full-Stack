import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decode = JWT.verify(token, process.env.JWT_SECRET)
        req.user = decode;
        console.log(req.user);
        next();
    } catch (error) {
        console.log('I am not working');
        res.status(401).json({ error: 'Invalid token' });
    }
}

export const requiresAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decode = JWT.verify(token, process.env.JWT_SECRET)
        // req.user = decode;
        const uss = await userModel.findOne({ _id: decode });
        if (uss.role === 0) res.status(201).json({ error: 'Not an admin' });
        console.log(uss.email);
        next();
    } catch (error) {
        console.log('I am not working');
        res.status(401).json({ error: 'Invalid token' });
    }
}