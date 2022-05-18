require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const todos = require("./routes/todos");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/", express.static("public"));
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }));
// 이것들은 왜있는거지

app.use("/todos", todos);

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log(`✅ Connected to DB`))
	.catch((e) => console.log(`❌ Error on DB connection: ${e}`));

app.listen(PORT, function () {
	console.log(`Example App listening on port ${PORT}`);
});
