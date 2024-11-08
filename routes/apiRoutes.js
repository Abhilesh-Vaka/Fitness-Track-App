const db = require("../models");

module.exports = function(app) {

    app.get("/api/workouts", (req, res) => {
        db.Workout.find({}).sort({ _id: -1 }).limit(10)
            .populate("exercises")
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });

    app.put("/api/workouts/:id", (req, res) => {
        
        if (req.body.type === "cardio") {
            db.CardioExercise.create(req.body)
                .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true }))
                .then(dbWorkout => {
                    res.json(dbWorkout);
                })
                .catch(err => {
                    res.json(err);
                });
        } else if (req.body.type === "resistance") {
            db.ResistanceExercise.create(req.body)
                .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true }))
                .then(dbWorkout => {
                    res.json(dbWorkout);
                })
                .catch(err => {
                    res.json(err);
                });
        } else {
            throw new Error("Invalid Workout type.");
        };
    });

    //Create new workout
    app.post("/api/workouts", (req, res) => {
        db.Workout.create(req.body)
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });
    //Get workouts in range
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
            .populate("exercises")
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });
}