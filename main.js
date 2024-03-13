status_coco = "";
object = [];
function preload(){
    office = loadImage("office.jpg");
}
function setup(){
    canvas = createCanvas(640, 400);
    canvas.center();
    objectDetection = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "STATUS:DETECTING OBJECTS";
    
}
function draw(){
   image(office, 0, 0, 640, 400);
   if(status_coco != ""){
    for(i = 0; i < object.length; i++){
        document.getElementById("status").innerHTML = "STATUS:OBJECTS HAVE BEEN DETECTED";
        fill("#FF0000");
        confidence = floor(object[i].confidence * 100);
        text(object[i].label + " " + confidence + "%", object[i].x, object[i].y);
        noFill();
        stroke("#FF0000");
        rect(object[i].x, object[i].y, object[i].width, object[i].height);
    }

   }
}
function modelLoaded(){
console.log("model loaded ")
status1 = true;
objectDetection.detect(office, gotResults);
}
function gotResults(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    object = results;
}