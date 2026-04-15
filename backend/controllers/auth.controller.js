const { UserModel } = require("../models/user.model");
const { z } = require("zod");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.signup = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;

        const zodUserSchema = z.object({
            username: z.string().min(3).max(15),
            password: z.string().min(6).max(15),
            email: z.string().email().min(7).max(20),
            role: z.enum(["user", "admin"]).optional(),
        })

        const isValidation = zodUserSchema.safeParse(req.body);

        if (!isValidation.success) {
            return res.status(400).json({
                msg: isValidation.error.errors,
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await UserModel.create({
            username,
            password: hashPassword,
            email,
            role: "user"
        })


        res.status(201).json(
            {
                msg: "U Signed Up"
            }
        )
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ msg: "Email already registered" });
        }
        res.status(500).json(
            {
                msg: "Server error",
                error: err.message
            }
        );
    }
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: "User Not found"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            return res.status(401).json({
                msg: "Invalid credentials"
            })
        }


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.status(200).json(
            {
                msg: "U logged In",
                token
            }
        )

    } catch (err) {
        res.status(500).json(
            {
                msg: "Server error",
                error: err.message
            }
        );
    }
}