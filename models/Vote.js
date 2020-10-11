const Joi = require('joi');
const mongoose = require('mongoose');
const { Candidate } = require("./Candidate");


voteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique : true,
    required:true,
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required:true,
  },
  // name: {
  //   type: String,
  //   required: true,
  //   minlength: 3,
  //   maxlength: 50
  // },
  
})





const Vote = mongoose.model('Vote', voteSchema ) ;



async function validateVote(body) {
  

  // const schema = Joi.object({
  //   name: Joi.string().min(5).max(50).required(),
  //   //votesCount: Joi.number().required(),
  // })
  // console.log("drdrdrdr     ",schema.validate(candidate));
  // return schema.validate(candidate);
  return {}

}

exports.Vote = Vote; 
exports.validate = validateVote;