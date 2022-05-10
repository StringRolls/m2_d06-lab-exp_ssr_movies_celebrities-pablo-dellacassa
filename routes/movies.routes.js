// starter code in both routes/celebrities.routes.js and routes/movies.routes.js

const { Router } = require("express");
const app = require("../app");
const router = new Router();

const Celebrity = require("./../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here

router
  .route("/movies/create")
  .get((req, res) => {
    Celebrity.find().then((allCelebrities) =>
      res.render("movies/new-movie", { allCelebrities })
    );
  })
  .post((req, res) => {
    const { title, genre, plot, cast } = req.body;
    Movie.create({ title, genre, plot, cast })
      .then(() => {
        res.redirect("/movies");
      })
      .catch((err) => res.render("celebrities/new-celebrity"));
  });

router.get("/movies", (req, res) => {
  Movie.find()
    .then((movies) => {
      res.render("movies/movies", { movies });
    })
    .catch((err) =>
      console.log(`Error while listing movies from the DB: ${err}`)
    );
});

router.get("/movies/:id", (req, res) => {
  const id = req.params.id;
  Movie.findById(id)
    .populate("cast")
    .then((movie) => {
      res.render("movies/movie-details", { movie });
    })
    .catch((err) =>
      console.log(`Error while seeing movie details from the DB: ${err}`)
    );
});

router.post("/movies/:id/delete", (req, res) => {
  const id = req.params.id;
  Movie.findByIdAndRemove(id)
    .then(() => res.redirect("/movies"))
    .catch((err) => console.log(`Error while deleting movie: ${err}`));
});

router
  .route("/movies/:id/edit")
  .get((req, res) => {
    const id = req.params.id;
    Movie.findById(id)
      .populate("cast")
      .then((newMovie) => {
        Celebrity.find()
          .then((celebs) =>
            res.render("movies/edit-movie.hbs", {
              movie: newMovie,
              celebs
            })
          )
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  })

  .post((req, res) => {
    const id = req.params.id;
    const { title, genre, plot, cast } = req.body;
    Movie.findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
      .then(() => {
        res.redirect(`/movies/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  });

module.exports = router;
