const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { mongoose } = require('./db/mongoose');
const { List, Task } = require('./db/models');
// Local middle ware

app.use(bodyParser.json());
/*Root handlers*/
//CORS policy
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods","GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**
 * GET /lists
 * Purpose: Get all lists
 */
app.get('/lists', (req, res) => {
    //Return array of all the list in the database;
    List.find({}).then((lists) => {
        res.send(lists);
    }).catch((e) => {
        res.send(e);
    });
})
/**
 * POST /lists
 * Purpose: Create a list
 */
app.post('/lists', (req, res) => {
    //Create a new list and return new list including the ID
    let title = req.body.title;
    let newList = new List({
        title,
        // _userId: req.user_id
    });
    newList.save().then((listDoc) => {
        // the full list document is returned (incl. id)
        res.send(listDoc);
    })

})

/**
 * PATCH /lists/:id
 * Purpose: Update a specified list
 */
app.patch('/lists/:id', (req, res) => {
    //Update the speified list with the new json of the request.
    List.findOneAndUpdate({ _id: req.params.id, _userId: req.user_id }, {
        $set: req.body
    }).then(() => {
        res.send({ 'message': 'updated successfully' });
    });
});

app.delete('/lists/:id', (req, res) => {
    //delete the speified list.
    List.findOneAndRemove({
        _id: req.params.id,
    }).then((removedListDoc) => {
        res.send(removedListDoc);
    })
});



app.get('/lists/:listId/tasks', (req, res) => {
    // We want to return all tasks that belong to a specific list (specified by listId)
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    })
});
/**
 * POST /lists/:listId/tasks
 * Purpose: Create a new task in a specific list
 */
app.post('/lists/:listId/tasks',  (req, res) => {
    // We want to create a new task in a list specified by listId
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc);
    })
})

/**
 * PATCH /lists/:listId/tasks/:taskId
 * Purpose: Update an existing task
 */
app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
            Task.findOneAndUpdate({
                _id: req.params.taskId,
                _listId: req.params.listId
            }, {
                    $set: req.body
                }
            ).then(() => {
                res.send({ message: 'Updated successfully.' })
            })
});

/**
 * DELETE /lists/:listId/tasks/:taskId
 * Purpose: Delete a task
 */
app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
            Task.findOneAndRemove({
                _id: req.params.taskId,
                _listId: req.params.listId
            }).then((removedTaskDoc) => {
                res.send(removedTaskDoc);
            })
});



app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

// app.get('/lists/:listId/tasks/:taskId',(req,res)=>{
//             Task.findOne({
//                 _id: req.params.taskId,
//                 _listId: req.params.listId
//             }).then((task) => {
//                 res.send(task);
//             })
// });

// app.get('/', (req,res)=>{
//     res.send("Hello world");
// })