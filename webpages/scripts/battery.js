var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
})

ros.on("connection", function(){
    console.log('Connected!')
    // ---------------------------------------------------------------------------------------
    // Subscibe to battery state
    var listener_battery = new ROSLIB.Topic({
        ros : ros,
        name : '/battery_state',
        messageType : 'sensor_msgs/BatteryState'
    });

    listener_battery.subscribe(function(message) {
        updateBatteryDisplay(message.percentage)
    });

    // ---------------------------------------------------------------------------------------
    // Show battery level
    function updateBatteryDisplay(percentage) {
        if (percentage > 1){
            percentage = 1
        }
        else if (percentage < 0){
            percentage = 0
        }

        var level = Math.round(percentage * 100);
        var batteryLevel = jQuery('.battery .battery-level');
        batteryLevel.css('width', level + '%');
        batteryLevel.text(level + '%');

        if (level > 30) {  
            batteryLevel.addClass('high'); 
            batteryLevel.removeClass('low');
            localStorage.setItem('pop-up', 0)
        } 
        else {  
            batteryLevel.addClass('low');  
            batteryLevel.removeClass('high');  
            
            if (localStorage.getItem('pop-up') == 0){
                alert('Robot Battery Is Low')
                localStorage.setItem('pop-up', 1)
            }
        }
    }
})
