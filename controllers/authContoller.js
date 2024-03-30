import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    // console.log(`register controller called`);
    try {
        const { name, email, password, phone, address } = req.body;
        if (!name) return res.send({ message: `Name is compulsory` });
        if (!email) return res.send({ message: `Email is compulsory` });
        if (!password) return res.send({ message: `Password is compulsory` });
        if (!phone) return res.send({ message: `Phone is compulsory` });

        const existinguser = await userModel.findOne({ email: email });

        if (existinguser) {
            res.status(200).send({
                success: true,
                message: 'User already registered. Please log in '
            })
        }

        const hashedPassword = await hashPassword(password);
        // console.log(hashedPassword);

        const user = await new userModel({ name, email, password: hashedPassword, phone, address }).save();

        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: `ERROR in registration`
        })
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: 'Invalid username or password'
            })
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registerd",
            });
        }

        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(500).send({
                status: false,
                message: 'Invalid Password'
            })
        }
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).send({
            status: true,
            message: 'Login Successful',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                adddress: user.address,
                role: user.role
            },
            token
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'Login Failed'
        })
    }
}

export const testController = async (req, res) => {
    res.send('Glad to see you made it');
}