const mongoose = require('mongoose')
const { Schema } = mongoose

const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    created_at: { type: Date },
    updated_at: { type: Date }
})

TaskSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if ( !this.created_at ) {
      this.created_at = now;
    }
    next();
});

module.exports = mongoose.model('Task', TaskSchema)