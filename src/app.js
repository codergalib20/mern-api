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
const comments = require("./routes/comment");
// User All Middleware
app.use(cooker());
app.use(express.json());
app.options("*", cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
// SETUP RESPONSE HEADERS MIDDLEWARE OR ACCESS CONTROL HEADERS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Acces-Control-Allow-Methods",
        "GET,POST,PUT,PATCH,DELETE",
        "OPTIONS"
    );
    res.setHeader(
        "Acces-Contorl-Allow-Methods",
        "Content-Type",
        "application/json"
    );
    next();
});




mongoose.connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connect with server"))
    .catch(err => console.log(err));
// Call Routes function
routes();

function routes() {
    app.use("/api/auth", auth);
    app.use("/api/posts", posts);
    app.use("/api/comments", comments);
}
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Headers : Origin, Content-Type, Accept");

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
// first route
app.get("/", (req, res) => {
    res.send("This is Brain skill server");
});

// Undefined Route Implement
app.use((req, res, next) => {
    res.status(404).json({ error: true, message: "Not Found this route" });
});

// Error Route Implement
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Application running in port no ${port}`);
})