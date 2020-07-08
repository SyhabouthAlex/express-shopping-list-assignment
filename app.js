/** Shopping list app */
const express = require("express");
const ExpressError = require("./expressError");
const app = express();
const itemRoutes = require("./routes");

app.use(express.json());

app.use("/items", itemRoutes);

app.use(function(req, res, next) {
    return next(new ExpressError("Not Found", 404))
});
  
app.use((err, req, res, next) => {
    res.status(err.status || 500);
  
    return res.json({
      error: err.message,
    });
});
  
module.exports = app;