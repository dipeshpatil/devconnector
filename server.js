const express = require("express");
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

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);
app.use("/api/profile", profileRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
