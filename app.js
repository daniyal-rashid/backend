const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db/connect_db.js");
const adminRouter = require("./routes/admin.js");
const router = require("./routes/route.js");
const authenticationMiddleware = require("./middleware/auth.js");

app.use(cors());

const PORT = 3000;
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);
app.use("/api/v1/admin", authenticationMiddleware, adminRouter);

app.listen(PORT, console.log(`Server is running at http://localhost:3000`));
