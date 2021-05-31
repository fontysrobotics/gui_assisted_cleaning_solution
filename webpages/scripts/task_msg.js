// connecting to ros
var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
})
// Subscibe to task state
ros.on("connection", function(){
    var listener_task = new ROSLIB.Topic({
        ros : ros,
        name: '/task',
        messageType: 'assisted_cleaning_solution/Task'
    });

    listener_task.subscribe(function(message) {
        var taskState = message.task
        if (taskState >= 3){
            taskState = 3
        }
        language_state_text(taskState*-1 + 24)
    });
})

// ---------------------------------------------------------------------------------------
// publish task
function pub_task(action){
    var robot_task = new ROSLIB.Topic({
        ros: ros,
        name: '/task',
        messageType: 'assisted_cleaning_solution/Task'
    })
    message = new ROSLIB.Message({
        task: action
    })
    robot_task.publish(message)
    console.log('action', action)
}

