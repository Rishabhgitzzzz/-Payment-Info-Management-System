const jwt = require("jsonwebtoken");
require('dotenv').config();


const auth = (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(400).json({
            msg: "Token not found"
        })
    }
    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.userID = decodedData.id;
        next();
    } catch (error) {
        return res.status(401).json(
            {
                msg: "Invalid token"
            }
        )
    }

}

module.exports = { auth };