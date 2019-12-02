const { Schema, model } = require('../../database/index');

const ProjectSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:'User',
        require: true,
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task',
    }],
}, {
    timestamps: true,
});


module.exports = model('Project', ProjectSchema);