const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const { connectToDB } = require("./utils/database");

const userRoutes = require("./routes/user");
const courseRoutes = require("./routes/course");

const { setHeaders } = require("./middlewares/headers");
const { errorHandler } = require("./middlewares/errors");

const app = express();

//──── Server Port
const port = process.env.PORT || 4000;

//──── Static Folder
app.use("/images", express.static(path.join(__dirname, "public", "images")));

//──── Middlewares
app.use(bodyParser.json());
app.use(setHeaders);

//──── Routes
app.use("/api", userRoutes);
app.use("/api", courseRoutes);

//──── Error Handler Middleware
app.use(errorHandler);

//──── Connecting To Database
connectToDB()
    .then(result => {
        console.log(`Connected To Database`);
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(err => {
        console.log(err);
    });
