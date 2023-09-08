var express = require('express')
const Task  = require('../models/task');

var router = express.Router()
router.get('/', async function (req, res) {
  try {
    const tasks = await Task.find({});
    return res.render('todo', {
      title: "Home",
      task: tasks,
    });
  } catch (err) {
    console.error('Error in fetching tasks from db', err);
    res.status(500).send('Internal Server Error');
  }
});

  
router.post('/create-task', async function (req, res) {
  try {
    const newTask = await Task.create({
      description: req.body.description,
      category: req.body.category,
      date: req.body.date,
    });
    newTask.save();
    return res.redirect('back');
  } catch (err) {
    console.error('Error in creating task', err);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/delete-task', async function (req, res) {
  try {
    const ids = Array.isArray(req.query.id) ? req.query.id : [req.query.id];

    await Promise.all(ids.map(async (taskId) => {
      await Task.findByIdAndDelete(taskId);
    }));

    return res.redirect('back');
  } catch (err) {
    console.error('Error in deleting tasks', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports=router;
