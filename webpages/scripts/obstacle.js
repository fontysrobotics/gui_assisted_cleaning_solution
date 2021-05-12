var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
})

ros.on("connection", function(){
    this.obstacle_response = new ROSLIB.SimpleActionServer({
        ros:ros,
        serverName:'/reaction_obstacle_service',
        actionName:'assisted_cleaning_solution/ReactionObstacleAction'
    })

    var that = this;

    that.obstacle_response.on('goal',function(goalMessage){
        $('.pop-outer').fadeIn('slow')

        $('.turn').click(function(){
            $('.pop-outer').fadeOut('slow')
            var result = {reaction: true};
            that.obstacle_response.setSucceeded(result)
        })

        $('.continue').click(function(){
            $('.pop-outer').fadeOut('slow')
            var result = {reaction: false};
            that.obstacle_response.setSucceeded(result)
        })
    })
})