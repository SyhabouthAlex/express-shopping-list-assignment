const express = require("express");
const items = require("./fakeDb");
const ExpressError = require("./expressError");
const router = new express.Router();

router.get("/", function(req, res) {
    return res.json(items);
})

router.post("/", function(req, res) {
    items.push({name: req.body.name, price: req.body.price});

    return res.json({added: {name: req.body.name, price: req.body.price}})
})

router.get("/:name", function(req, res, next) {
    try {
        let index = items.findIndex((item) => item.name == req.params.name)
        if (index == -1) {
            throw new ExpressError("Item not found", 404);
        }
        return res.json(items[index]);
    }
    catch(err) {
        return next(err)
    }
})

router.patch("/:name", function(req, res, next) {
    try {
        let index = items.findIndex((item) => item.name == req.params.name)
        if (index == -1) {
            throw new ExpressError("Item not found", 404)
        }
        items[index] = {name: req.body.name, prices: req.body.price};
    }
    catch(err) {
        return next(err)
    }
    

    return res.json({updated: {name: req.body.name, price: req.body.price}});
})

router.delete("/:name", function(req, res, next) {
    try {
        let index = items.findIndex((item) => item.name == req.params.name)
        if (index == -1) {
            throw new ExpressError("Item not found", 404)
        }
        items.splice(index, 1);

        return res.json({message: "Deleted"}); 
    }
    catch(err) {
        return next(err)
    }
})

module.exports = router;