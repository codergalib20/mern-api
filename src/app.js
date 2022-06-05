const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
// Connect all routes
const auth = require("./routes/auth");
// User All Middleware
app.use(express.json());
main().catch(err=>console.error(err));
async function main() {
    try {
       await mongoose.connect(`${process.env.MONGO_URI}`)
            .then(() => console.log("Connect with server"))
            .catch(err => console.log(err));
            // Call Routes function
        await routes();
    }
    catch (err) {
        console.log(err);
    }
}

function routes () {
    app.use("/api/auth", auth);
}

app.listen(port, () => {
    console.log(`Application running in port no ${port}`);
})