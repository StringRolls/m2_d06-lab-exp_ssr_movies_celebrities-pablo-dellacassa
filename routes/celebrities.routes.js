// starter code in both routes/celebrities.routes.js and routes/movies.routes.js

const { Router } = require("express");
const app = require("../app");
const router = new Router();

const Celebrity = require("../models/Celebrity.model");

// all your routes here
router
.route("/celebrities/create")
.get((req, res, next) => {
  res.render("celebrities/new-celebrity");
})
.post((req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((err) => res.render("celebrities/new-celebrity"));
});

router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
      .then((celebrities) => {
        res.render("celebrities/celebrities", { celebrities });
      })
      .catch((err) =>
        console.log(`Error while listing celebrities from the DB: ${err}`)
      );
  });







module.exports = router;
