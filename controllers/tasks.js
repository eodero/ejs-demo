const Task = require('../models/Task');

const addTask = (req, res) => {
  res.render('pages/addTask');
    // res.send("in addTask");
}

const createTask = async (req, res) => {
    try {
        if (req.body.complete) {
          req.body.completed = true;
        }
        await Task.create(req.body);
        req.session.pendingMessage = "The task was created.";
        res.redirect("/tasks");
      } catch (err) {
        if (err.name === "ValidationError") {
          res.locals.message = Object.values(err.errors)
            .map((item) => item.message)
            .join(", ");
        } else {
          res.locals.message = "Something went wrong.";
        }
        res.render("pages/addTask");
      }
    //  res.send("in createTask");
}

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    req.session.pendingMessage = "Task deleted successfully.";
    res.redirect('/tasks')
} catch (err) {
    req.session.pendingMessage = 'Something went wrong.'
    res.redirect('/tasks')
}
    // res.send("in deleteTask");
}

const editTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        res.render('pages/editTask', { task })
    } catch (err) {
        req.session.pendingMessage = 'Something went wrong.'
        res.redirect('/tasks')
    }
    // res.send("in editTask");
}

const updateTask = async (req, res) => {
    let task = false;
    try {
      if (req.body.complete) {
        req.body.completed = true;
      }
      task = await Task.findById(req.params.id);
      await Task.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
      });
      req.session.pendingMessage = "The task was updated.";
      res.redirect("/tasks");
    } catch (err) {
      if (err.name === "ValidationError") {
        res.locals.message = Object.values(err.errors)
          .map((item) => item.message)
          .join(", ");
      } else {
        res.locals.message = "Something went wrong.";
      }
      if (task) {
        res.render("pages/editTask", { task });
      } else {
        req.session.pendingMessage = "Something went wrong.";
        res.redirect("/tasks");
      }
    }
//    res.send("in updateTask");
}

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.render("pages/tasks", { tasks });
      } catch (err) {
        res.locals.message = "Something went wrong.";
        res.render("pages/tasks", { tasks: [] });
      }
    // res.send("in getTasks");
}

module.exports = {
    addTask,
    createTask,
    deleteTask,
    updateTask,
    editTask,
    getTasks
};