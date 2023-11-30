const jwt = require("jsonwebtoken");


module.exports = function authenticationMiddleware(req, res, next) {
    const cookie = req.cookies;


    if (!cookie) {
        return res.status(401).json({ message: "No Cookie provided" });
    }
    const token = cookie.token;
    if (!token) {
        return res.status(405).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) {
            return res.status(403).json({ message: "Invalid token" });
        }

        req.user = decoded.user;
        next();
    });
};