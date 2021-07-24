const express = require("express");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

// Keep apiRoutes always on top of html route or the wildcard on html route won't allow api to execute.
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));