const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Please add a project title'], 
    trim: true 
  },
  description: { type: String },
  // Relationship: Every project MUST belong to a Team
  team: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Team', 
    required: true 
  },
  status: {
    type: String,
    enum: ['Active', 'Archived', 'Completed'],
    default: 'Active'
  },
  deadline: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);