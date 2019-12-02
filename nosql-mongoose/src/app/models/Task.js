const { Schema, model } = require('../../database/index');

const TaskSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref:'Project',
        require: true,
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref:'User',
        require: true,
    },
    completed: {
        type: Boolean,
        require: true,
        default: false,
    },
}, {
    timestamps: true,
});


module.exports = model('Task', TaskSchema);