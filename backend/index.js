require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./routes/auth");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

const allowedOrigins = [
    "http://localhost:3000",
    "http://yashasviprasad.com",
    "https://yashasviprasad.com"
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true); // allow Postman or server-to-server requests
            if (allowedOrigins.indexOf(origin) === -1) {
                return callback(new Error("Not allowed by CORS"), false);
            }
            return callback(null, true);
        },
        credentials: true,
    })
);
app.use(express.json());


mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected "))
    .catch((err) => console.log("MongoDB Error ", err));

app.use("/api", auth);
app.use("/api/blogs", blogRoutes);

const PORT = process.env.PORT || 8018;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});