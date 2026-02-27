require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./routes/auth");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

app.use(
    cors({
        origin: ["http://localhost:3000", "https://yashasviprasad.com"],
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