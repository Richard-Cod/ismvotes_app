const { Candidate, validate } = require("../models/Candidate");
const auth = require("../middlewares/auth");
const express = require("express");
const { Vote } = require("../models/Vote");
const router = express.Router();


// Lister tous les candidats
router.get("/", async (req, res) => {
  const candidates = await Candidate.find()
    .select("votesCount user")
    .populate("user","name email _id")
    .sort("name");
  res.send(candidates);
});

// Déposer sa candidature 
router.post("/",auth, async (req, res) => {
  const { error } = await validate(req.body.user);
  if(error) return res.status(400).send(error)

  const searchCandidate = await Candidate.findOne({user: req.user._id})
  if (searchCandidate) res.status(400).send({error : "Vous êtes déja candidat"})
  
  try {
    let candidate = new Candidate({user: req.user._id});
    candidate = await candidate.save();
    res.send(candidate);
  } catch (error) {
    return res.status(400).send(error)
  }
  
});

// Obtenir un candidat par son id
router.get("/:id", async (req, res) => {
  const candidate = await Candidate.findById(req.params.id).select("-__v");

  if (!candidate)
    return res
      .status(404)
      .send("The candidate with the given ID was not found.");

  res.send(candidate);
});

// Supprimer ma candidature
router.delete("/removecandidature/me",auth, async (req, res) => {

  const candidate = await Candidate.findOneAndDelete({
    user : req.user._id
  });

  console.log("candidate FOund ",candidate);
  
  if (!candidate)
    return res
      .status(404)
      .send("The candidate with the given ID was not found.");


  const removed = await Vote.deleteMany({candidate : candidate._id});

  console.log("removed ",removed);


  
  res.send({candidate,msg:"Candidat supprimé avec succès"});
});

module.exports = router;