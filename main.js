video="";
status_1="";
objects=[];
function preload(){
    video = createVideo("video.mp4");
    video.hide();
}
function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
}
function draw(){
    image(video,0,0,480,380);
    if(status_1 != ""){
        objectDetector.detect(video,gotResult);
        for(i=1;i<objects.length;i++){
            document.getElementById("status").innerHTML = "Status:Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected are" + objects.length;

            fill("#000000");
            percent = floor[objects(i).confidence * 100];
            text(objects(i).label + " " + percent + "%",objects(i).x+15, objects(i).y+15);
            noFill();
            stroke("#000000");
            rect(objects(i).x, objects(i).y, objects(i).width, objects(i).height)
        }
    }
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects"
} 
function modelLoaded(){
    console.log("Model is Loaded");
    status_1 = true;
    video.loop();
    video.volume(0);
    video.speed(1);
}
function gotResult(error,results){
    if(error){
        console.log("Error");
    }
    else{
        console.log(results);
        objects=results;
    }
}

