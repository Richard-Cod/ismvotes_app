const { Vote, validate } = require("../models/Vote");
const { Candidate } = require("../models/Candidate");
const auth = require("../middlewares/auth");
const express = require("express");
const router = express.Router();

async function userHasVotedOr400(req,res) {
  const searchVote = await Vote.findOne({user : req.user._id})
  if (searchVote) return res.status(400).send("Vous avez déja voté")
}

async function getCandidateOr400(req,res) {
  let candidate = await Candidate.findOne({_id:req.body.candidate}).populate('user')
  if (!candidate) return res.status(400).send("pas de candidat")
  return candidate
}

// Lister tous les votes
router.get("/", async (req, res) => {
  const votes = await Vote.find()
  res.send(votes);
});


// Voter pour un candidat
router.post("/up",auth, async (req, res) => { 
  const { error } = await validate(req.body);
  if(error) return res.status(400).send(error)

  // Tester si cet utilisateur n'a pas déja voté
  await userHasVotedOr400(req,res)
  
  // Tester si ce candidat existe
  let candidate = await getCandidateOr400(req,res)
  
  // Incrémenter le nombre de vote de ce candidat
  candidate.votesCount++ 

  let vote = new Vote({
    user: req.user._id,
    candidate : req.body.candidate
  });

  try {
    await vote.save();
    await candidate.save()
    res.send({success:"Votre vote a bien été pris en compte"})
  } catch (err) {
    res.status(400).send(err)
  }
  
});


// Retirer son vote
router.post("/down",auth, async (req, res) => { 
  const { error } = await validate(req.body);
  if(error) return res.status(400).send(error)

  // Tester si ce candidat existe
  let candidate = await getCandidateOr400(req,res)

  // Vérifier si ce candidat n'a pas déja 0 vote
  if (candidate.votesCount == 0) return res.status(400).send("Ce candidat a 0 votes")
  
  // Décrémenter le nombre de vote de ce candidat
  candidate.votesCount--

  //Verifier si cet utilisateur a voté pour ce candidat
  let vote = await Vote.findOne({
    user: req.user._id,
    candidate : req.body.candidate
  });
  if (!vote) return res.status(400).send("Vote non trouvé")
  

  try {
    await vote.remove();
    await candidate.save()
    res.send({success:"Votre vote a bien été supprimé"})
  } catch (err) {
    res.status(400).send(err)
  }
  
});



module.exports = router;