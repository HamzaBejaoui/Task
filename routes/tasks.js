const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const passport = require('passport');


//Add new task 
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const task = new Task({
        name: req.body.name,
        done: req.body.done,
        owner: req.body.owner
    })
    task.save((err, task) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error while saving '
            });
        }
        if (!task) {
            return res.send({
                success: false,
                message: 'failed to save task'
            });
        }
        return res.send({
            success: true,
            task,
            message: 'Task Saved'
        })
    })
});
//list own task 
router.post('/list', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const owner = req.body.owner;
    Task.find({ owner }, (err, tasks) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error while retrieving tasks '
            });
        }
        if (!tasks) {
            return res.send({
                success: false,
                message: 'you  have no tasks yet '
            })
        }

        return res.send({
            success: true,
            tasks
        })
    })
});
//delete task
router.delete('/remove/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const taskId = req.params.id;
    Task.remove({ _id: taskId }, (err) => {
        if (err) {
            return res.send({
                success: false,
                message: 'failed to delete the task '
            })
        }
        return res.send({
            success: true,
            message: 'task deleted '
        })
    })
});
module.exports = router;