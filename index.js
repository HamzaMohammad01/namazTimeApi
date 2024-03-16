const express = require("express");
const config = require("config");

const app = express();
const mongoose = require("mongoose");
const salahTime = require("./app/routes/salahTime");

require("./startup/prod")(app);

let db_connect = config.get("db");
console.log(db_connect);
mongoose
	.connect(db_connect)
	.then(() => console.log("Connected to Mongodb..."))
	.catch((e) => console.log(e.message));

app.use(express.json());
app.use("/api/salahtime", salahTime);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
