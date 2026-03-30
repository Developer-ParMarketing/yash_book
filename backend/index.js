require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./routes/auth");
const blogRoutes = require("./routes/blogRoutes");
const contactRoute = require("./routes/contactRoute");
const glossaryRoutes = require("./routes/glossaryRoutes");

const app = express();

app.set("trust proxy", 1);

const allowedOrigins = [
    "http://localhost:3000",
    "http://yashasviprasad.com",
    "https://yashasviprasad.com",
    "https://www.yashasviprasad.com"
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
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
app.use("/api/contact", contactRoute);
app.use("/api/glossary", glossaryRoutes);

const PORT = process.env.PORT || 8018;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});