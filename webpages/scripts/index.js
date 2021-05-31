// updating the state of robot when pressed and setting the state in the text on main page
var state = parseInt(localStorage.getItem("state"))
language_state_text(state*-1 + 24)
if ((state == 1) || (state == 2) || (state <= -2)){
    pub_task(state)
}

// ---------------------------------------------------------------------------------------
// Change text of state.
function language_state_text(index){
    language = localStorage.getItem('language')

    $.getJSON('language/'+ language +'.json', function(data){
        var items = []

        $.each(data, function(key,val){
            items.push(val)
        })
        element = document.getElementById("stateRobot");
        element.innerHTML = items[index];
    })
}
// ---------------------------------------------------------------------------------------
// change state when next room, stop or task is pressed
function change_state(value){
    localStorage.setItem("state", value)

    if (value == 0){
        pub_task(0)
    }
    else if (value >= 3){
        var nextRoomNumbers = JSON.parse(localStorage.getItem("rooms"))
        var roomNumbers = nextRoomNumbers.slice(1)
        
        localStorage.setItem("rooms", JSON.stringify(roomNumbers))
        pub_task(parseInt(nextRoomNumbers[0])+2) 
    }
    else{
        history.back();
    }
}