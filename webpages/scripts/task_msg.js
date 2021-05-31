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
        if (taskState <= -2){
            taskState = taskState*-1 +14
        }
        else if (taskState == 0){
            taskState = 15
        }
        else if ((taskState >= 1) || (taskState <= 2)){
            taskState = taskState + 17
        }
        else if (taskState > 3){
            taskState = 20
        }
        language_state_text(taskState)
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

