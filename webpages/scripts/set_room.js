// values to change to fit too location
var possibleRooms = [1, 2, 3, 4]; // change array to change the number of rooms

// makes the list for the rooms to go to. By changing the array more rooms can be added.
possibleRooms.forEach(function(item){
    var add = "<button class='possible'>&#177</button>"
    $('<div>')
        .attr('id', possibleRooms[item-1])
        .appendTo('b')
        .append($(add).text(possibleRooms[item-1]))
        
        .click(function() {
            addRemoveFromList(this.id)
        });
})

// ---------------------------------------------------------------------------------------
// reading out array for remebering rooms to go to.
var addedRoomNumbers = JSON.parse(localStorage.getItem("rooms"));

// create list for the rooms to go to
addedRoomNumbers.forEach(function(item) {
    var li = document.createElement("li");
    var text = document.createTextNode(item);
    li.appendChild(text);
    document.getElementById("roomsToGoTo").appendChild(li);
});

// ---------------------------------------------------------------------------------------
// add new element to the list and array
function addRemoveFromList(roomNumber) {
    var addedRoomNumbers = JSON.parse(localStorage.getItem("rooms"));

    // when no rooms are in list make a empty array
    if (addedRoomNumbers == null){
        addedRoomNumbers = new Array();
        localStorage.setItem("rooms", JSON.stringify(addedRoomNumbers))
    }
    else{
        var index = $.inArray(roomNumber, addedRoomNumbers);
        
        if (index >= 0){
            var list = document.getElementById("roomsToGoTo");
            list.removeChild(list.childNodes[index]);
            addedRoomNumbers.splice(index, 1);
            localStorage.setItem("rooms", JSON.stringify(addedRoomNumbers)); 
        }

        else{
            var list = document.createElement("li");
            var text = document.createTextNode(roomNumber);
            list.appendChild(text);
            document.getElementById("roomsToGoTo").appendChild(list);
            addedRoomNumbers.push(roomNumber);
            localStorage.setItem("rooms", JSON.stringify(addedRoomNumbers));
        }
    }
}