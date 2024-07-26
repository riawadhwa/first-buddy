const app = require("./app"); // Import the app
require('dotenv').config();

// Start the server
const port = process.env.PORT || 3000; // Default to port 3000 if not provided by environment
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
