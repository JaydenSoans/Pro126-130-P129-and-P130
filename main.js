song1 = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

song1_status = "";
song2_status = "";

scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    song1 = loadSound("enemy.mp3")
    song2 = loadSound("hold.mp3")
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modalLoaded);
    poseNet.on('pose', gotResults);
}


function modalLoaded() {
    console.log("Posenet is initialized");
}

function gotResults(results) {
    if (results.length > 0) {
        console.log(results);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score right wrist = " + scoreRightWrist + ", Score left wrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist x = " + leftWristX + ", Left wrist y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist x = " + rightWristX + ", right wrist y = " + rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("red");
    stroke("red");


    if (scoreLeftWrist > 0.20) {
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if (song2_status == false) {
            song2.play();
            document.getElementById("sname").innerHTML = "Playing - Enemy";
        }
    }

    if (scoreRightWrist > 0.20) {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if (song1_status == false) {
            song1.play();
            document.getElementById("sname").innerHTML = "Playing - Can't Hold Us";
        }
    }
}