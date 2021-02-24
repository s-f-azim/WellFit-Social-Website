import express from "express";
const router = new express.Router();

import User from "../models/User.js";

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));     
});

router.route('/edit/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.weight = Number(req.body.weight);
            user.height = Number(req.body.height);
            user.bmi = Number(req.body.bmi);
            user.prefferedGender = req.body.prefferedGender;
            user.isPregnant = req.body.isPregnant;
            user.fitnessLevel = req.body.fitnessLevel;

            user.save()
                .then(() => res.json('user edited!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

export default router;