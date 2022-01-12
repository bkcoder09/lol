song = "";

function preload(){
    song = loadSound("music.mp3");
}

leftX = 0;
leftY = 0;

rightX = 0;
rightY = 0;

scoreleftWrist = 0;
scoreRightWrist = 0;

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is Initialized");
}


function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score Left Wrist - "+scoreLeftWrist);
        console.log("Score Right Wrist - "+scoreRightWrist);

        leftX = results[0].pose.leftWrist.x;
        leftY = results[0].pose.leftWrist.y;
        console.log("Left Wrist's X -"+leftX+" Left Wrist's Y - "+leftY);

        rightX = results[0].pose.rightWrist.x;
        rightY = results[0].pose.rightWrist.y;
        console.log("Right Wrist's X - "+rightX+" Right Wrist's Y - "+rightY);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("#e187ff");
    stroke("#e187ff");
    circle(rightX, rightY, 20);

    if(scoreRightWrist > 0.2){
    if(rightY > 0 && rightY <= 100){
        document.getElementById("speed").innerHTML = "Speed - 0.5x / Slow";
        song.rate(0.5);
    }
    else if(rightY > 100 && rightY <= 200){
        document.getElementById("speed").innerHTML = "Speed - 1x / Normal";
        song.rate(1);
    }
    else if(rightY > 200 && rightY <= 300){
        document.getElementById("speed").innerHTML = "Speed - 1.5x / Little Fast";
        song.rate(1.5);
    }
    else if(rightY > 300 && rightY <= 400){
        document.getElementById("speed").innerHTML = "Speed - 2x / Fast";
        song.rate(2);
    }
    else if(rightY > 400 && rightY <= 500){
        document.getElementById("speed").innerHTML = "Speed - 2.5x / Very Fast";
        song.rate(2.5);
    }
}

    if(scoreLeftWrist > 0.2){
        circle(leftX, leftY, 20);
        inNumberLeftWristY = Number(leftY);
        removeDecimals = floor(inNumberLeftWristY);
        volume = removeDecimals/500;
        document.getElementById("volume").innerHTML = "Volume - "+volume;
        song.setVolume(volume);
    }
}

function uhoh(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
