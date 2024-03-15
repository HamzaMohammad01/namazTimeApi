const express = require("express");
const app = express();
const mongoose = require("mongoose");
const salahTime = require("./app/routes/salahTime");

require("./startup/prod")(app);

mongoose
	.connect("mongodb://localhost/salahtime")
	.then(() => console.log("Connected to Mongodb..."))
	.catch(() => console.log("Could not connected to Mongodb..."));

app.use(express.json());
app.use("/api/salahtime", salahTime);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
