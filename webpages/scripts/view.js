// ---------------------------------------------------------------------------------------
// switching the view between robot on map and the camera view
function switchView(){
    var x = document.getElementById("map")
    var y = document.getElementById("videoElement")
    if(x.style.display === "none"){
        x.style.display = "block";
        y.style.display = "none";
    }
    else{
        x.style.display="none"
        y.style.display = "block";
    }
}

// ---------------------------------------------------------------------------------------
// show camera view
var video = document.querySelector("#videoElement");

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({video: true})
    .then(function (stream) {
        video.srcObject = stream;
    })
}

// ---------------------------------------------------------------------------------------
// Load the image with the room numbering
var floorplanImage = "./images/Floorplan.png"; // change path to change image
window.onload = function() {
    var canvas = document.getElementById("floorplanImage");
    var ctx = canvas.getContext("2d");
    const img = new Image()
    img.src = floorplanImage // change the file name to set other floorplan
    img.onload = () => {  
        ctx.drawImage(img, 0, 10, 400, 390)
        }
}; 
