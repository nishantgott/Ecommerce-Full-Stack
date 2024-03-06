import JWT from 'jsonwebtoken';

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