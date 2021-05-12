// Connect to ROS.
var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
});

ros.on("connection", function(){

    // Create the main viewer.
    var viewer = new ROS2D.Viewer({
        divID : 'map',
        width : 400,
        height : 400
    });

    // Setup the map client.
    var gridClient = new ROS2D.OccupancyGridClient({
        ros : ros,
        rootObject : viewer.scene
    });

    // Scale the canvas to fit to the map
    gridClient.on('change', function(){
        viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
        viewer.shift(gridClient.currentGrid.pose.position.x, gridClient.currentGrid.pose.position.y);
        displayPoseMarker();
    });

    // ----------------------------------------------------------------------
    // Showing the pose on the map
    // ----------------------------------------------------------------------

    function displayPoseMarker(){

        // the visual robot marker
        var robotMarker = new ROS2D.NavigationArrow({
            size : 12,
            strokeSize : 1,
            fillColor : createjs.Graphics.getRGB(10, 255, 177, 1),
            pulse : true
        });
        robotMarker.visible = false;

        gridClient.rootObject.addChild(robotMarker);
        var initScaleSet = false;

        // subscribe to navigation message for position
        var poseListener = new ROSLIB.Topic({
            ros : ros,
            name : '/odom',
            messageType : 'nav_msgs/Odometry',
            throttle_rate : 100
        });
        
        poseListener.subscribe(function(pose) {

          // read out the data received
            robotMarker.x = pose.pose.pose.position.x;
            robotMarker.y = -pose.pose.pose.position.y;

            if (!initScaleSet) {
                robotMarker.scaleX = 1.0 / viewer.scene.scaleX;
                robotMarker.scaleY = 1.0 / viewer.scene.scaleY;
                initScaleSet = true;
            }
            robotMarker.rotation = viewer.scene.rosQuaternionToGlobalTheta(pose.pose.pose.orientation);
            robotMarker.visible = true;
        });
    } // end display pose marker
});