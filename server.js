const express = require("express");
const path = require('path');
const connectDB = require("./config/db");

const userRoute = require("./routes/api/users");
const profileRoute = require("./routes/api/profile");
const authRoute = require("./routes/api/auth");
const postsRoute = require("./routes/api/posts");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);
app.use("/api/profile", profileRoute);

// Serve Static Assets in Prod
if (process.env.NODE_ENV === 'production') {
  // Set Static Folder
  app.use(express.static('client/build'));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
