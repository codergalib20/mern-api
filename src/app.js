const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
const cooker = require("cookie-parser");
// Connect all routes
const auth = require("./routes/auth");
const posts = require("./routes/post");
// User All Middleware
app.use(express.json());
app.use(cors());
app.use(cooker());
main().catch(err => console.error(err));
async function main() {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
            .then(() => console.log("Connect with server"))
            .catch(err => console.log(err));
        // Call Routes function
        await routes();
    }
    catch (err) {
        console.log(err);
    }
}

function routes() {
    app.use("/api/auth", auth);
    app.use("/api/posts", posts);
}

app.listen(port, () => {
    console.log(`Application running in port no ${port}`);
})