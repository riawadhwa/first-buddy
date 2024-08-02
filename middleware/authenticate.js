const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
    // Use lowercase header for case-insensitive access
    const token = req.headers["authorization"]?.split(" ")[1];

    console.log("Received token:", token); // Debug log

    if (!token) {
        return res.status(401).json({ error: "Access denied, token missing" });
    }

    try {
        // Verify the token and extract the payload
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // Ensure payload contains the user ID
        if (!payload || !payload._id) {
            return res
                .status(401)
                .json({ error: "Access denied, token invalid" });
        }

        // Attach user ID to the request object
        req.user = payload._id;
        console.log("User ID attached to request:", req.user); // Debug log
        next();
    } catch (error) {
        console.error("Token verification error:", error); // Debug log
        return res.status(401).json({ error: "Access denied, token invalid" });
    }
}

module.exports = authenticate;
