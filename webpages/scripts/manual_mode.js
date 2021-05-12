// connecting to ros
var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
})

// send message
var cmdVel = new ROSLIB.Topic({
    ros: ros,
    name: '/cmd_vel',
    messageType: 'geometry_msgs/Twist'
})

// one function for all the movements
var move = function(x_lin , z_ang) {
    message = new ROSLIB.Message({
        linear: { x: x_lin, y: 0, z: 0, },
        angular: { x: 0, y: 0, z: z_ang, }
    })
    cmdVel.publish(message)
}
