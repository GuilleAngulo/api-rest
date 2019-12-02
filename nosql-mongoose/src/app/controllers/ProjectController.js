const express = require('express');

const Project = require('../models/Project');
const Task = require('../models/Task');

module.exports = {
    async index(req, res) {
        try {
            const projects = await Project.find().populate(['user', 'tasks']);

            return res.status(200).send({ projects });

        } catch (err) {
            return res.status(400).send({ error: 'Error listing projects.' });
        }
    },

    async find(req, res) {
        try {
            const project = await Project.findById(req.params.projectId).populate(['user', 'tasks']);

            return res.status(200).send({ project });

        } catch (err) {
            return res.status(400).send({ error: 'Error loading the project.' });
        }
    },

    async create(req, res) {

        try {
            const { title, description, tasks } = req.body;

            const project = await Project.create({ title, description, user: req.userId });


            await Promise.all(tasks.map(async task => {
                const projectTask = new Task ({ ...task, project: project._id });

                await projectTask.save();

                project.tasks.push(projectTask);
            }));

            await project.save();


            return res.status(200).send({ project });

        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Error creating new project.' });
        }
    },

    async update(req, res) {
        try {
            const { title, description, tasks } = req.body;

            const project = await Project.findByIdAndUpdate(req.params.projectId, { 
                title, 
                description
            }, { new: true });

            project.tasks = [];
            await Task.remove({ project: project._id });

            await Promise.all(tasks.map(async task => {
                const projectTask = new Task ({ ...task, project: project._id });

                await projectTask.save();

                project.tasks.push(projectTask);
            }));

            await project.save();


            return res.status(200).send({ project });

        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Error updating project.' });
        }
    },

    async remove(req, res) {
        try {
            await Project.findByIdAndRemove(req.params.projectId, { useFindAndModify: false });

            return res.status(200).send({ message: 'Project removed correctly.' });

        } catch (err) {
            return res.status(400).send({ error: 'Error removing the project.' });
        }
    },
};