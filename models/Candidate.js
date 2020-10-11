const Joi = require('joi');
const mongoose = require('mongoose');
const { User } = require("./user");


candidateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique : true,
    required:true,
  },
  // name: {
  //   type: String,
  //   required: true,
  //   minlength: 3,
  //   maxlength: 50
  // },
  votesCount: {
    type: Number,
    required: true,
    default : 0,
    min : [0, 'Le nombre de vote ne peut être négatif'],
  }
})





const Candidate = mongoose.model('Candidate', candidateSchema ) ;



async function validateCandidate(user_id) {
  try {
  const user = await User.findById(user_id)
  return {}
    
  } catch (error) {
    console.log("errir ",error);
    if(error.kind === "ObjectId" ) return {error: "Cet utilisateur n'existe pas"}

    return {error};
  }

  // const schema = Joi.object({
  //   name: Joi.string().min(5).max(50).required(),
  //   //votesCount: Joi.number().required(),
  // })
  // console.log("drdrdrdr     ",schema.validate(candidate));
  // return schema.validate(candidate);

}

exports.Candidate = Candidate; 
exports.validate = validateCandidate;